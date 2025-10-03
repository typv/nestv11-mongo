import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  WorkbookSubVersionStatus,
  WorkbookSubVersionTeam,
  WorkbookSubVersionType,
} from 'src/modules/workbook/workbook.enum';
import { User } from './user.model';
import { Workbook } from './workbook.model';
import { BaseDocument, BaseModel } from 'src/models/base.model';

@Schema({ _id: false })
export class TeamReviewInfo {
  @Prop({
    type: String,
    enum: WorkbookSubVersionStatus,
    required: true,
    default: WorkbookSubVersionStatus.Pending,
  })
  status: WorkbookSubVersionStatus;

  @Prop({ type: String, required: false, default: null })
  comment?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  reviewedBy?: User;

  @Prop({ type: Date, required: false, default: null })
  reviewedAt?: Date;
}

export type WorkbookSubVersionDocument = BaseDocument<WorkbookSubVersion>;

@Schema({ timestamps: true, collection: 'workbook-sub-versions' })
export class WorkbookSubVersion extends BaseModel {
  @Prop({ type: String, required: false, default: null })
  name: string;

  @Prop({ type: String, required: true })
  changeSet: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  updatedBy: User;

  @Prop({ type: Types.ObjectId, ref: 'Workbook', required: true })
  workbook: Workbook;

  @Prop({ type: String })
  snapshotFileKey?: string;

  @Prop({ type: String, enum: WorkbookSubVersionType, required: true })
  type: WorkbookSubVersionType;

  @Prop({ type: String, enum: WorkbookSubVersionTeam, required: true })
  team: WorkbookSubVersionTeam;

  @Prop({
    type: TeamReviewInfo,
    required: true,
    default: () => ({ status: WorkbookSubVersionStatus.Pending }),
  })
  imsReview: TeamReviewInfo;

  @Prop({
    type: TeamReviewInfo,
    required: true,
    default: () => ({ status: WorkbookSubVersionStatus.Pending }),
  })
  pmaReview: TeamReviewInfo;

  @Prop({
    type: TeamReviewInfo,
    required: true,
    default: () => ({ status: WorkbookSubVersionStatus.Pending }),
  })
  pmsReview: TeamReviewInfo;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;
}

export const WorkbookSubVersionSchema = SchemaFactory.createForClass(WorkbookSubVersion);
