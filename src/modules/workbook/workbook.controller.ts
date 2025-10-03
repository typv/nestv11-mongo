import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { PaginationResponseDto } from 'src/common/dto';
import {
  FindWorkbookListDto,
  ImportWorkbookDto, ImportWorkbookResponseDto,
  WorkbookListResponseDto,
} from 'src/modules/workbook/dto';
import { WorkbookService } from './workbook.service';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { RoleCode } from '../../common/enums';
import { RoleBaseAccessControl, SwaggerApiDocument, User } from '../../decorators';

@Controller('workbook')
@ApiTags('Workbook')
@ApiBearerAuth()
@RoleBaseAccessControl(RoleCode.IMA, RoleCode.IMS, RoleCode.PMA, RoleCode.PMS)
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) {}

  @RoleBaseAccessControl(RoleCode.IMA)
  @Post('import')
  @FormDataRequest()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: ImportWorkbookResponseDto,
    },
    body: { type: ImportWorkbookDto, required: true },
    operation: {
      operationId: 'importWorkbook',
      summary: 'Import workbook',
    },
  })
  importWorkbook(
    @User('id') userId: string,
    @User('role') role: RoleCode,
    @Body() body: ImportWorkbookDto,
  ): Promise<ImportWorkbookResponseDto> {
    return this.workbookService.importWorkbook(userId, role, body);
  }

  @Get()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: WorkbookListResponseDto,
      isPagination: true,
    },
    operation: {
      operationId: 'workbookList',
      summary: 'Api workbookList',
      description: 'Workbook List',
    },
  })
  workbookList(
    @User('id') userId: string,
    @Query() query: FindWorkbookListDto,
  ): Promise<PaginationResponseDto<WorkbookListResponseDto>> {
    return this.workbookService.workbookList(userId, query);
  }
}
