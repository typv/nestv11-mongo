import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IWorkbookData, IWorksheetData } from '@univerjs/core';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Readable } from 'node:stream';
import { PaginationResponseDto } from 'src/common/dto';
import { JsonStreamUtil } from 'src/common/utilities/json-stream.util';
import { Logger } from 'winston';
import { FindWorkbookListDto, ImportWorkbookDto, ImportWorkbookResponseDto, WorkbookListResponseDto } from './dto';
import { ERROR_RESPONSE, fileExtensionConstant } from '../../common/constants';
import { RoleCode } from '../../common/enums';
import { ServerException } from '../../exceptions';
import { BaseService } from '../base.service';
import { WorkbookVersionStatus } from 'src/modules/workbook/workbook.enum';
import { UploadService } from 'src/modules/upload';
import { FileUtil } from 'src/common/utilities/file.util';
import { WorkbookRepository } from 'src/data-access/repositories/workbook/workbook.repository';
import { WorkbookVersionRepository } from 'src/data-access/repositories/workbook-version/workbook-version.repository';
import { RoleRepository } from 'src/data-access/repositories/role/role.repository';
import { WorkbookVersion } from 'src/data-access/models';

@Injectable()
export class WorkbookService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectConnection() private readonly connection: Connection,
    private readonly uploadService: UploadService,
    private readonly workbookRepository: WorkbookRepository,
    private readonly workbookVersionRepository: WorkbookVersionRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    super();
    this.logger = this.logger.child({ context: WorkbookService.name });
  }

  async importWorkbook(
    userId: string,
    role: RoleCode,
    body: ImportWorkbookDto,
  ): Promise<ImportWorkbookResponseDto> {
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

    const existingWorkbook = await this.workbookRepository.findOne({
      univerWorkbookId: workbookData.id,
    });
    if (existingWorkbook) {
      throw new ServerException(ERROR_RESPONSE.WORKBOOK_ALREADY_EXISTED);
    }
    const roleDoc = await this.roleRepository.findOne({ code: role });
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
      const userIdObj = new Types.ObjectId(userId);

      // Upset workbook
      const workbook = await this.workbookRepository.findOrCreateByUniverId(
        univerWorkbookId,
        userIdObj,
        workbookData.name,
        session
      );

      // Create workbook version
      const latestVersion = await this.workbookVersionRepository.getLatestVersion(workbook._id, session);
      const nextVersion = (latestVersion?.version ?? 0) + 1;
      await this.workbookVersionRepository.createVersion(
        {
          name: workbookData.name,
          workbook: workbook._id,
          version: nextVersion,
          role: roleDoc._id,
          status: WorkbookVersionStatus.Awaiting,
          snapshotFileKey: uploadResponse.fileKey,
          submittedBy: new Types.ObjectId(userId),
          submittedAt: new Date(),
        } as unknown as Partial<WorkbookVersion>,
        session,
      );
      await session.commitTransaction();

      return {
        workbookId: workbook._id.toString(),
        univerWorkbookId,
      };
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
    const { page, pageSize } = query;
    const aggregationBuilder = this.workbookVersionRepository.getWorkbookListAggregationBuilder(query);

    return await this.workbookVersionRepository.aggregatePaginate(aggregationBuilder, page, pageSize);
  }
}
