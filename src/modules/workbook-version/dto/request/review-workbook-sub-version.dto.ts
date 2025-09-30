import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WorkbookSubVersionStatus } from '../../../../common/enums/workbook.enum';

export class ReviewWorkbookSubVersionDto {
  @IsString()
  @IsNotEmpty()
  workbookSubVersionId: string;

  @ApiProperty({
    description: 'Status',
    example: WorkbookSubVersionStatus.APPROVED,
  })
  @IsNotEmpty()
  @IsEnum(WorkbookSubVersionStatus)
  @IsIn([WorkbookSubVersionStatus.APPROVED, WorkbookSubVersionStatus.REJECTED])
  status: WorkbookSubVersionStatus;

  @ApiProperty({
    description: 'Rejected Reason',
    example: 'Rejected Reason',
  })
  @IsString()
  @IsOptional()
  rejectedReason?: string;
}
