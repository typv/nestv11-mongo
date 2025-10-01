import { PropertyDto } from 'src/decorators';
import { WorkbookVersionStatus } from 'src/modules/workbook/workbook.enum';
import {
  SubVersionResponseDto
} from 'src/modules/workbook/workbook-version/dto/response/workbook-sub-version-response.dto';

export class VersionResponseDto {
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

  @PropertyDto({
    type: SubVersionResponseDto,
    structure: 'dtoArray',
  })
  subVersions: SubVersionResponseDto[];
}