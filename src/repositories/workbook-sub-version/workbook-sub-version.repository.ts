import { BaseRepository } from 'src/repositories/base.repository';
import { WorkbookSubVersion, WorkbookSubVersionDocument } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class WorkbookSubVersionRepository extends BaseRepository<WorkbookSubVersion, WorkbookSubVersionDocument> {
  constructor(@InjectModel(WorkbookSubVersion.name) private workbookSubVersionModel: Model<WorkbookSubVersionDocument>) {
    super(workbookSubVersionModel);
  }
}