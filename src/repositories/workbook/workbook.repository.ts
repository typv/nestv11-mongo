import { BaseRepository } from 'src/repositories/base.repository';
import { Workbook, WorkbookDocument } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

export class WorkbookRepository extends BaseRepository<Workbook, WorkbookDocument> {
  constructor(@InjectModel(Workbook.name) private workbookModel: Model<WorkbookDocument>) {
    super(workbookModel);
  }

  async findOrCreateByUniverId(
    univerWorkbookId: string,
    ownerId: Types.ObjectId,
    workbookName: string,
    session: ClientSession,
  ): Promise<WorkbookDocument> {

    const workbook = await this.model.findOneAndUpdate(
      { univerWorkbookId: univerWorkbookId, owner: ownerId },
      {
        $setOnInsert: {
          univerWorkbookId: univerWorkbookId,
          name: workbookName,
          owner: ownerId,
        },
      },
      { upsert: true, new: true, session },
    ).exec();

    return workbook as WorkbookDocument;
  }
}