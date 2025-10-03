import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkbookRepository } from 'src/repositories/workbook/workbook.repository';
import { Workbook, WorkbookSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workbook.name, schema: WorkbookSchema }]),
  ],
  providers: [WorkbookRepository],
  exports: [WorkbookRepository],
})
export class WorkbookDAModule {}