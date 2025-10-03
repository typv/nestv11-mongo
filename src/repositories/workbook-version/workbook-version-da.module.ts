import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkbookVersion, WorkbookVersionSchema } from 'src/models';
import { WorkbookVersionRepository } from 'src/repositories/workbook-version/workbook-version.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkbookVersion.name, schema: WorkbookVersionSchema }]),
  ],
  providers: [WorkbookVersionRepository],
  exports: [WorkbookVersionRepository],
})
export class WorkbookVersionDAModule {}