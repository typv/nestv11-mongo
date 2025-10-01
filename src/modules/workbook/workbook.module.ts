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
} from '../../models';
import { WorkbookVersionModule } from 'src/modules/workbook/workbook-version/workbook-version.module';
import { AwsS3Module } from 'src/modules/base/aws-s3';
import { UploadModule } from 'src/modules/upload';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workbook.name, schema: WorkbookSchema },
      { name: WorkbookVersion.name, schema: WorkbookVersionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    NestjsFormDataModule,
    WorkbookVersionModule,
    AwsS3Module,
    UploadModule
  ],
  controllers: [WorkbookController],
  providers: [WorkbookService],
  exports: [WorkbookService],
})
export class WorkbookModule {}
