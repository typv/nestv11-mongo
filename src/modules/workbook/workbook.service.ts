import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IWorksheetData } from '@univerjs/core';
import { Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ImportWorkbookDto } from './dto';
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

@Injectable()
export class WorkbookService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Workbook.name) private workbookModel: Model<WorkbookDocument>,
    @InjectModel(Worksheet.name) private worksheetModel: Model<WorksheetDocument>,
    @InjectModel(WorkbookVersion.name)
    private workbookVersionModel: Model<WorkbookVersionDocument>,
  ) {
    super();
    this.logger = this.logger.child({ context: WorkbookService.name });
  }

  async importWorkbook(
    userId: string,
    body: ImportWorkbookDto,
  ): Promise<SuccessResponseDto> {
    const { sheets, ...workbookData } = body;
    const sheetsData = Object.values(sheets);
    const sheetIds = Object.keys(sheets);

    this.validateSheetOrder(workbookData.sheetOrder, sheetIds);
    try {
      const workbook = await this.workbookModel.findOneAndUpdate(
        { univerWorkbookId: workbookData.id, owner: new Types.ObjectId(userId) },
        {
          $setOnInsert: {
            univerWorkbookId: workbookData.id,
            owner: new Types.ObjectId(userId),
          },
        },
        { upsert: true, new: true },
      );
      // Create workbook version
      const version = await this.getNextWorkbookVersion(workbook._id);
      const workbookVersion = await this.workbookVersionModel.create({
        ...workbookData,
        workbook: workbook._id,
        version,
      });
      // Create worksheets
      const worksheetsDocs = sheetsData.map((sheet: IWorksheetData) => {
        return {
          ...sheet,
          workbook: workbook._id,
          univerWorksheetId: sheet.id,
          workbookVersion: workbookVersion._id,
        };
      });
      const newWorksheets = await this.worksheetModel.insertMany(worksheetsDocs);
      // Link worksheets to workbook version
      await this.workbookVersionModel.updateOne(
        { _id: workbookVersion._id },
        { $set: { sheets: newWorksheets.map((worksheet) => worksheet._id) } },
      );

      return this.responseSuccess();
    } catch (error: unknown) {
      this.logger.error({
        message: 'WorkbookService.importWorkbook: Failed to import workbook',
        context: 'WorkbookService.importWorkbook',
        error: error,
      });
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Failed to import workbook',
      });
    }
  }

  /* ----Helper Methods---- */
  private async getNextWorkbookVersion(workbookId: Types.ObjectId): Promise<number> {
    const latest = await this.workbookVersionModel
      .findOne({ workbook: workbookId })
      .sort({ version: -1 });
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
}
