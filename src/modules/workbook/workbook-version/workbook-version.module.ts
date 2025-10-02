import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { WorkbookVersionController } from './workbook-version.controller';
import { WorkbookVersionService } from './workbook-version.service';
import {
  Role,
  RoleSchema,
  Workbook,
  WorkbookSchema,
  WorkbookSubVersion,
  WorkbookSubVersionSchema,
  WorkbookVersion,
  WorkbookVersionSchema,
} from '../../../models';
import { UploadModule } from '../../upload';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workbook.name, schema: WorkbookSchema },
      { name: WorkbookVersion.name, schema: WorkbookVersionSchema },
      { name: WorkbookSubVersion.name, schema: WorkbookSubVersionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    NestjsFormDataModule,
    UploadModule,
  ],
  controllers: [WorkbookVersionController],
  providers: [WorkbookVersionService],
})
export class WorkbookVersionModule {}
