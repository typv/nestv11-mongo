import { PropertyDto } from 'src/decorators';
import { WorkbookApprovedStatus } from 'src/modules/workbook/workbook.enum';

export class WorkbookListResponseDto {
  @PropertyDto()
  workbookId: string;

  @PropertyDto()
  workbookVersionId: string;

  @PropertyDto()
  univerWorkbookId: string;

  @PropertyDto()
  originalName: string;

  @PropertyDto()
  versionName: string;

  @PropertyDto()
  uploadedTime: Date;

  @PropertyDto()
  lastApproveBy: Date;

  @PropertyDto()
  version: number;

  @PropertyDto()
  approvedStatus: WorkbookApprovedStatus;

  @PropertyDto()
  createdAt: Date;

  @PropertyDto()
  updatedAt: Date;
}