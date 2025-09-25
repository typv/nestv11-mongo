import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WorkbookService } from './workbook.service';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { SwaggerApiDocument, User } from '../../decorators';
import { ImportWorkbookDto } from 'src/modules/workbook/dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('workbook')
@ApiTags('Workbook')
@ApiBearerAuth()
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) {}

  @Post('import')
  @FormDataRequest()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
    },
    body: { type: ImportWorkbookDto, required: true },
    operation: {
      operationId: 'importWorkbook',
      summary: 'Import workbook',
    },
  })
  importWorkbook(
    @User('id') userId: string,
    @Body() body: ImportWorkbookDto,
  ): Promise<SuccessResponseDto> {
    return this.workbookService.importWorkbook(userId, body);
  }
}
