import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IResources, IStyleData, Nullable } from '@univerjs/core';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from './role.model';
import { User } from './user.model';
import { Workbook } from './workbook.model';
import { LocaleType } from '../modules/workbook/dto';
import { WorkbookPermission, WorkbookVersionStatus } from 'src/modules/workbook/workbook.enum';

@Schema({ _id: false })
export class Collaborator {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: String,
    enum: WorkbookPermission,
    required: true,
  })
  permission: WorkbookPermission;

  @Prop({ type: Date, default: Date.now })
  grantedAt: Date;
}

export type WorkbookVersionDocument = HydratedDocument<WorkbookVersion>;

@Schema({ timestamps: true, collection: 'workbook-versions' })
export class WorkbookVersion {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, default: 1 })
  version: number;

  @Prop({ type: Boolean, required: true, default: true })
  isCurrentActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Workbook', required: true })
  workbook: Workbook;

  @Prop({
    type: String,
    enum: WorkbookVersionStatus,
    required: true,
    default: WorkbookVersionStatus.Awaiting,
  })
  status: WorkbookVersionStatus;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @Prop({ type: String })
  snapshotFileKey?: string;
}

export const WorkbookVersionSchema = SchemaFactory.createForClass(WorkbookVersion);

WorkbookVersionSchema.index({ workbook: 1, version: 1 }, { unique: true });
WorkbookVersionSchema.index({ workbook: 1, version: -1 });
