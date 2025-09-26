import { PropertyDto } from 'src/decorators';
import { WorkbookApprovedStatus } from 'src/modules/workbook/workbook.enum';

export class WorkbookListResponseDto {
  @PropertyDto()
  id: string;

  @PropertyDto()
  name: string;

  @PropertyDto()
  uploadTime: Date;

  @PropertyDto()
  lastApproveBy: Date;

  @PropertyDto()
  version: number;

  @PropertyDto()
  approvedStatus: WorkbookApprovedStatus;
}