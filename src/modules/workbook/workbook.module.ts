import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { WorkbookController } from './workbook.controller';
import { WorkbookService } from './workbook.service';
import {
  Role,
  RoleSchema,
  Workbook,
  WorkbookSchema,
  WorkbookVersion,
  WorkbookVersionSchema,
  Worksheet,
  WorksheetSchema,
} from '../../models';
import { WorkbookVersionModule } from 'src/modules/workbook/workbook-version/workbook-version.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workbook.name, schema: WorkbookSchema },
      { name: Worksheet.name, schema: WorksheetSchema },
      { name: WorkbookVersion.name, schema: WorkbookVersionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    NestjsFormDataModule,
    WorkbookVersionModule,
  ],
  controllers: [WorkbookController],
  providers: [WorkbookService],
  exports: [WorkbookService],
})
export class WorkbookModule {}
