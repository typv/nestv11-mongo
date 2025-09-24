import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImportWorkbookDto } from './dto/import-workbook.dto';
import { WorkbookService } from './workbook.service';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { SwaggerApiDocument, User } from '../../decorators';

@Controller('workbook')
@ApiTags('Workbook')
@ApiBearerAuth()
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) {}

  @Post('import')
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
