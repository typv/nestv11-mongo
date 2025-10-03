import { PropertyDto } from 'src/decorators';
import { WorkbookSubVersionStatus } from 'src/modules/workbook/workbook.enum';
import { Types } from 'mongoose';
import { IWorkbookData } from '@univerjs/core';

export class SubVersionResponseDto {
  @PropertyDto()
  id: string;

  @PropertyDto()
  version: Types.Decimal128 | string;

  @PropertyDto()
  status: WorkbookSubVersionStatus;

  @PropertyDto()
  updatedBy: string;

  @PropertyDto()
  updatedAt: Date;

  @PropertyDto()
  rejectedReason: string;

  @PropertyDto()
  snapshotFileKey: string;

  @PropertyDto()
  changeSet?: Partial<IWorkbookData>;
}