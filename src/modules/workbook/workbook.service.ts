import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ERROR_RESPONSE } from '../../common/constants';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { ServerException } from '../../exceptions';
import {
  Workbook,
  WorkbookDocument,
  WorkbookVersion,
  WorkbookVersionDocument,
  Worksheet,
  WorksheetDocument,
} from '../../models';
import { BaseService } from '../base.service';
import { FindWorkbookListDto, ImportWorkbookDto, WorkbookListResponseDto } from './dto';
import { JsonStreamUtil } from 'src/common/utilities/json-stream.util';
import {
  CustomData,
  IStyleData,
  IWorkbookData,
  IWorksheetData,
  Nullable,
} from '@univerjs/core';
import { Readable } from 'node:stream';
import { PaginationResponseDto } from 'src/common/dto';

@Injectable()
export class WorkbookService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Workbook.name) private workbookModel: Model<WorkbookDocument>,
    @InjectModel(Worksheet.name) private worksheetModel: Model<WorksheetDocument>,
    @InjectModel(WorkbookVersion.name)
    private workbookVersionModel: Model<WorkbookVersionDocument>,
    @InjectConnection() private readonly connection: Connection
  ) {
    super();
    this.logger = this.logger.child({ context: WorkbookService.name });
  }

  async importWorkbook(
    userId: string,
    body: ImportWorkbookDto,
  ): Promise<SuccessResponseDto> {
    const { file } = body;
    const jsonStream: Readable = Readable.from(file.buffer);
    let workbookData: IWorkbookData;
    try {
      workbookData = await JsonStreamUtil.processJsonStreamSimple<IWorkbookData>(jsonStream);
    } catch (e) {
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('json'))
    }

    const { sheets } = workbookData;
    const sheetsData = Object.values(sheets);
    const sheetIds = Object.keys(sheets);
    this.validateSheetOrder(workbookData.sheetOrder, sheetIds);

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const workbook = await this.workbookModel.findOneAndUpdate(
        { univerWorkbookId: workbookData.id, owner: new Types.ObjectId(userId) },
        {
          $setOnInsert: {
            univerWorkbookId: workbookData.id,
            name: workbookData.name,
            owner: new Types.ObjectId(userId),
          },
        },
        { upsert: true, new: true, session },
      );
      // Create workbook version
      const version = await this.getNextWorkbookVersion(workbook._id, session);
      const [workbookVersion] = await this.workbookVersionModel.create([{
        ...workbookData,
        workbook: workbook._id,
        version,
      }], { session });
      // Create worksheets
      const worksheetsDocs = sheetsData.map((sheet: IWorksheetData) => {
        return {
          ...sheet,
          workbook: workbook._id,
          univerWorksheetId: sheet.id,
          workbookVersion: workbookVersion._id,
        };
      });
      const newWorksheets = await this.worksheetModel.insertMany(worksheetsDocs, { session });
      // Link worksheets to workbook version
      await this.workbookVersionModel.updateOne(
        { _id: workbookVersion._id },
        { $set: { sheets: newWorksheets.map((worksheet) => worksheet._id) } },
        { session }
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
        _id: { $toString: '$_id' },
        univerWorkbookId: '$w.univerWorkbookId',
        originalName: '$w.name',
        versionName: '$name',
        version: 1,
        approvedStatus: '$w.approvedStatus',
        uploadedTime: '$w.createdAt',
        createdAt: 1,
        updatedAt: 1,
      }
    });
    pipeline.push({ $sort: { createdAt: -1 } });
    const aggregationBuilder = this.workbookVersionModel.aggregate(pipeline);

    return await this.aggregatePaginate(aggregationBuilder, page, pageSize);
  }
}
