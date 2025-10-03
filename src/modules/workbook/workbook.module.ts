import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { WorkbookController } from './workbook.controller';
import { WorkbookService } from './workbook.service';
import { WorkbookVersionModule } from 'src/modules/workbook/workbook-version/workbook-version.module';
import { AwsS3Module } from 'src/modules/base/aws-s3';
import { UploadModule } from 'src/modules/upload';
import { RoleDAModule, WorkbookDAModule, WorkbookVersionDAModule } from 'src/repositories';

@Module({
  imports: [
    NestjsFormDataModule,
    WorkbookVersionModule,
    AwsS3Module,
    UploadModule,
    WorkbookDAModule,
    WorkbookVersionDAModule,
    RoleDAModule
  ],
  controllers: [WorkbookController],
  providers: [ WorkbookService ],
  exports: [WorkbookService],
})
export class WorkbookModule {}
