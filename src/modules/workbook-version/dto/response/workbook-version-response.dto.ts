import { PropertyDto } from 'src/decorators';
import { WorkbookVersionStatus } from 'src/common/enums/workbook.enum';

export class WorkbookVersionsResponseDto {
  @PropertyDto()
  id: string;

  @PropertyDto()
  versionName: string;

  @PropertyDto()
  version: number;

  @PropertyDto()
  status: WorkbookVersionStatus;

  @PropertyDto()
  createdAt: Date;

  @PropertyDto()
  updatedAt: Date;

  @PropertyDto()
  isCurrentActive: Boolean;

  @PropertyDto()
  submittedBy: string;

  @PropertyDto()
  submittedAt: Date;
}