import { BaseRepository } from 'src/repositories/base.repository';
import { WorkbookVersion, WorkbookVersionDocument } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, ClientSession, Model, Types } from 'mongoose';
import { FindWorkbookListDto } from 'src/modules/workbook/dto';

export class WorkbookVersionRepository extends BaseRepository<WorkbookVersion, WorkbookVersionDocument> {
  constructor(@InjectModel(WorkbookVersion.name) private workbookVersionModel: Model<WorkbookVersionDocument>) {
    super(workbookVersionModel);
  }

  getWorkbookListAggregationBuilder(query: FindWorkbookListDto): Aggregate<any[]> {
    const { searchKeyword, statuses, from, until } = query;
    const pipeline = [];

    const initialMatch: any = { isCurrentActive: true };

    if (searchKeyword) {
      initialMatch.name = new RegExp(searchKeyword, 'i');
    }
    if (from || until) {
      const updatedAtCondition: any = {};
      if (from) updatedAtCondition['$gte'] = new Date(from);
      if (until) updatedAtCondition['$lte'] = new Date(until);
      if (Object.keys(updatedAtCondition).length > 0) {
        initialMatch.updatedAt = updatedAtCondition;
      }
    }
    pipeline.push({ $match: initialMatch });

    pipeline.push({
      $lookup: {
        from: 'workbooks',
        localField: 'workbook',
        foreignField: '_id',
        as: 'w'
      }
    });
    pipeline.push({
      '$unwind': {
        path: '$w',
        preserveNullAndEmptyArrays: true
      }
    });

    if (statuses?.length) {
      pipeline.push({
        $match: {
          'w.approvedStatus': { $in: statuses }
        }
      });
    }

    pipeline.push({
      $project: {
        workbookId: { $toString: '$w._id' },
        workbookVersionId: { $toString: '$_id' },
        univerWorkbookId: '$w.univerWorkbookId',
        originalName: '$w.name',
        versionName: '$name',
        version: 1,
        approvedStatus: '$w.approvedStatus',
        uploadedTime: '$w.createdAt',
        createdAt: 1,
        updatedAt: 1,
        _id: 0
      }
    });
    pipeline.push({ $sort: { createdAt: -1 } });

    return this.model.aggregate(pipeline);
  }

  async getLatestVersion(workbookId: Types.ObjectId, session?: ClientSession): Promise<WorkbookVersionDocument | null> {
    return this.model
      .findOne({ workbook: workbookId })
      .sort({ version: -1 })
      .session(session)
      .exec();
  }

  async createVersion(data: Partial<WorkbookVersion>, session: ClientSession): Promise<WorkbookVersionDocument> {
    const [version] = await this.model.create([data], { session });
    return version;
  }
}