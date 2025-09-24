import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkbookController } from './workbook.controller';
import { WorkbookService } from './workbook.service';
import {
  Workbook,
  WorkbookSchema,
  WorkbookVersion,
  WorkbookVersionSchema,
  Worksheet,
  WorksheetSchema,
} from '../../models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workbook.name, schema: WorkbookSchema },
      { name: Worksheet.name, schema: WorksheetSchema },
      { name: WorkbookVersion.name, schema: WorkbookVersionSchema },
    ]),
  ],
  controllers: [WorkbookController],
  providers: [WorkbookService],
  exports: [WorkbookService],
})
export class WorkbookModule {}
