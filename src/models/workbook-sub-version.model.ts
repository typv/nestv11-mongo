import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  WorkbookSubVersionStatus,
  WorkbookSubVersionTeam,
  WorkbookSubVersionType,
} from 'src/modules/workbook/workbook.enum';
import { User } from './user.model';
import { Workbook } from './workbook.model';

export type WorkbookSubVersionDocument = HydratedDocument<WorkbookSubVersion>;

@Schema({ timestamps: true, collection: 'workbook-sub-versions' })
export class WorkbookSubVersion {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: false, default: null })
  name: string;

  @Prop({ type: String, required: true })
  changeSet: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  updatedBy: User;

  @Prop({
    type: String,
    enum: WorkbookSubVersionStatus,
    required: true,
    default: WorkbookSubVersionStatus.Pending,
  })
  status: WorkbookSubVersionStatus;

  @Prop({ type: String, required: false })
  rejectedReason: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  reviewedBy?: User;

  @Prop({ type: Date, required: false, default: null })
  reviewedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Workbook', required: true })
  workbook: Workbook;

  @Prop({ type: String })
  snapshotFileKey?: string;

  @Prop({ type: String, enum: WorkbookSubVersionType, required: true })
  type: WorkbookSubVersionType;

  @Prop({ type: String, enum: WorkbookSubVersionTeam, required: true })
  team: WorkbookSubVersionTeam;
}

export const WorkbookSubVersionSchema = SchemaFactory.createForClass(WorkbookSubVersion);
