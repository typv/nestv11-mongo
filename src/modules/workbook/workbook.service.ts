import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IWorkbookData, IWorksheetData } from '@univerjs/core';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Readable } from 'node:stream';
import { PaginationResponseDto } from 'src/common/dto';
import { JsonStreamUtil } from 'src/common/utilities/json-stream.util';
import { Logger } from 'winston';
import { FindWorkbookListDto, ImportWorkbookDto, WorkbookListResponseDto } from './dto';
import { ERROR_RESPONSE, fileExtensionConstant } from '../../common/constants';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { RoleCode } from '../../common/enums';
import { ServerException } from '../../exceptions';
import {
  Role,
  RoleDocument,
  Workbook,
  WorkbookDocument,
  WorkbookVersion,
  WorkbookVersionDocument,
} from '../../models';
import { BaseService } from '../base.service';
import { WorkbookVersionStatus } from 'src/modules/workbook/workbook.enum';
import { UploadService } from 'src/modules/upload';
import { FileUtil } from 'src/common/utilities/file.util';

@Injectable()
export class WorkbookService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Workbook.name) private workbookModel: Model<WorkbookDocument>,
    @InjectModel(WorkbookVersion.name)
    private workbookVersionModel: Model<WorkbookVersionDocument>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private readonly uploadService: UploadService,
  ) {
    super();
    this.logger = this.logger.child({ context: WorkbookService.name });
  }

  async importWorkbook(
    userId: string,
    role: RoleCode,
    body: ImportWorkbookDto,
  ): Promise<SuccessResponseDto> {
    const { file } = body;

    const isValidExtension = FileUtil.isValidExtension(file, [fileExtensionConstant.JSON]);
    if (!isValidExtension) {
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('file extension'));
    }

    const jsonStream: Readable = Readable.from(file.buffer);
    let workbookData: IWorkbookData;
    try {
      workbookData =
        await JsonStreamUtil.processJsonStreamSimple<IWorkbookData>(jsonStream);
    } catch (e) {
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('json'));
    }

    const existingWorkbook = await this.workbookModel.findOne({
      univerWorkbookId: workbookData.id,
    });
    if (existingWorkbook) {
      throw new ServerException(ERROR_RESPONSE.WORKBOOK_ALREADY_EXISTED);
    }
    const roleDoc = await this.roleModel.findOne({ code: role });
    if (!roleDoc) {
      throw new ServerException({
        ...ERROR_RESPONSE.RESOURCE_NOT_FOUND,
        message: 'Role not found',
      });
    }

    const univerWorkbookId = workbookData.id;
    const { sheets } = workbookData;
    const sheetIds = Object.keys(sheets);
    this.validateSheetOrder(workbookData.sheetOrder, sheetIds);

    // Save snapshot to S3
    const uploadResponse = await this.uploadService.uploadFile(file, `workbooks/${univerWorkbookId}/snapshots`);

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const workbook = await this.workbookModel.findOneAndUpdate(
        { univerWorkbookId: univerWorkbookId, owner: new Types.ObjectId(userId) },
        {
          $setOnInsert: {
            univerWorkbookId: univerWorkbookId,
            name: workbookData.name,
            owner: new Types.ObjectId(userId),
          },
        },
        { upsert: true, new: true, session },
      );
      // Create workbook version
      const version = await this.getNextWorkbookVersion(workbook._id, session);
      await this.workbookVersionModel.create(
        [
          {
            ...workbookData,
            workbook: workbook._id,
            version,
            role: roleDoc._id,
            status: WorkbookVersionStatus.Awaiting,
            submittedBy: new Types.ObjectId(userId),
            submittedAt: new Date(),
            snapshotFileKey: uploadResponse.fileKey,
          },
        ],
        { session },
      );
      await session.commitTransaction();

      return this.responseSuccess();
    } catch (error: unknown) {
      await session.abortTransaction();
      this.logger.error({
        message: 'WorkbookService.importWorkbook: Failed to import workbook',
        context: 'WorkbookService.importWorkbook',
        error: error,
      });
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Failed to import workbook',
      });
    } finally {
      await session.endSession();
    }
  }

  /* ----Helper Methods---- */
  private async getNextWorkbookVersion(workbookId: Types.ObjectId, session?: ClientSession): Promise<number> {
    const latest = await this.workbookVersionModel
      .findOne({ workbook: workbookId })
      .sort({ version: -1 })
      .session(session);
    return (latest?.version ?? 0) + 1;
  }

  private validateSheetOrder(sheetOrder: string[] | undefined, sheetIds: string[]) {
    if (!sheetOrder || sheetOrder.length !== sheetIds.length) {
      throw new ServerException({
        ...ERROR_RESPONSE.SHEET_ORDERS_DO_NOT_MATCH_THE_NUMBER_OF_SHEETS,
      });
    }
    if (sheetOrder.some((id) => !sheetIds.includes(id))) {
      throw new ServerException({
        ...ERROR_RESPONSE.SHEET_ORDERS_DO_NOT_MATCH_THE_SHEET_IDS,
      });
    }
  }

  async workbookList(userId: string, query: FindWorkbookListDto): Promise<PaginationResponseDto<WorkbookListResponseDto>> {
    const { searchKeyword, statuses, from, until, page, pageSize } = query;
    const pipeline = [];

    const initialMatch: any = { isCurrentActive: true };

    if (searchKeyword) {
      initialMatch.name = new RegExp(searchKeyword, 'i');
    }
    if (from || until) {
      const updatedAtCondition: any = {};
      if (from) updatedAtCondition['$gte'] = new Date(from);
      if (until) updatedAtCondition['$lte'] = new Date(until);
      if (Object.keys(updatedAtCondition).length > 0) {
        initialMatch.updatedAt = updatedAtCondition;
      }
    }
    pipeline.push({ $match: initialMatch });

    pipeline.push({
      $lookup: {
        from: 'workbooks',
        localField: 'workbook',
        foreignField: '_id',
        as: 'w'
      }
    });
    pipeline.push({
      '$unwind': {
        path: '$w',
        preserveNullAndEmptyArrays: true
      }
    });

    if (statuses?.length) {
      pipeline.push({
        $match: {
          'w.approvedStatus': { $in: statuses }
        }
      });
    }

    pipeline.push({
      $project: {
        workbookId: { $toString: '$w._id' },
        workBookVersionId: { $toString: '$_id' },
        univerWorkbookId: '$w.univerWorkbookId',
        originalName: '$w.name',
        versionName: '$name',
        version: 1,
        approvedStatus: '$w.approvedStatus',
        uploadedTime: '$w.createdAt',
        createdAt: 1,
        updatedAt: 1,
        _id: 0
      }
    });
    pipeline.push({ $sort: { createdAt: -1 } });
    const aggregationBuilder = this.workbookVersionModel.aggregate(pipeline);

    return await this.aggregatePaginate(aggregationBuilder, page, pageSize);
  }
}
