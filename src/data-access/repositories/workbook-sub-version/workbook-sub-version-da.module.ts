import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkbookSubVersion, WorkbookSubVersionSchema } from 'src/data-access/models';
import { WorkbookSubVersionRepository } from 'src/data-access/repositories/workbook-sub-version/workbook-sub-version.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkbookSubVersion.name, schema: WorkbookSubVersionSchema }]),
  ],
  providers: [WorkbookSubVersionRepository],
  exports: [WorkbookSubVersionRepository],
})
export class WorkbookSubVersionDAModule {}