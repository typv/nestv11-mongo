import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkbookRepository } from 'src/data-access/repositories/workbook/workbook.repository';
import { Workbook, WorkbookSchema } from 'src/data-access/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workbook.name, schema: WorkbookSchema }]),
  ],
  providers: [WorkbookRepository],
  exports: [WorkbookRepository],
})
export class WorkbookDAModule {}