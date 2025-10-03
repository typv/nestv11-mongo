import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WorkbookSubVersionStatus } from 'src/modules/workbook/workbook.enum';

export class ReviewWorkbookSubVersionDto {
  @IsString()
  @IsNotEmpty()
  workbookSubVersionId: string;

  @ApiProperty({
    description: 'Status',
    example: WorkbookSubVersionStatus.Approved,
  })
  @IsNotEmpty()
  @IsEnum(WorkbookSubVersionStatus)
  @IsIn([WorkbookSubVersionStatus.Approved, WorkbookSubVersionStatus.Rejected])
  status: WorkbookSubVersionStatus;

  @ApiProperty({
    description: 'Comment',
    example: 'Comment',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
