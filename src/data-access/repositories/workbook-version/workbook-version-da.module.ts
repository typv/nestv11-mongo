import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkbookVersion, WorkbookVersionSchema } from 'src/data-access/models';
import { WorkbookVersionRepository } from 'src/data-access/repositories/workbook-version/workbook-version.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkbookVersion.name, schema: WorkbookVersionSchema }]),
  ],
  providers: [WorkbookVersionRepository],
  exports: [WorkbookVersionRepository],
})
export class WorkbookVersionDAModule {}