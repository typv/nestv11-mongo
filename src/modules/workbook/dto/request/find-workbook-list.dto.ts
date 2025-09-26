import { PropertyDto } from "src/decorators";
import { PaginationQueryDto } from "src/common/dto";
import { WorkbookApprovedStatus } from 'src/modules/workbook/workbook.enum';
import { ValidateIf } from 'class-validator';

export class FindWorkbookListDto extends PaginationQueryDto {
  @PropertyDto({
    type: String,
    required: false,
    validated: true,
    example: 'abc',
  })
  searchKeyword: string;

  @PropertyDto({
    type: WorkbookApprovedStatus,
    structure: 'enumArray',
    required: false,
    validated: true,
    example: WorkbookApprovedStatus.Approved,
  })
  statuses: WorkbookApprovedStatus[];

  @PropertyDto({
    type: Date,
    required: false,
    validated: true,
    example: '2025-09-25T09:22:30Z',
  })
  from: Date;

  @PropertyDto({
    type: Date,
    required: true,
    validated: true,
    example: '2025-09-25T09:22:30Z',
  })
  @ValidateIf((req) => req.from)
  until: Date;
}