import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWorkbookData } from '@univerjs/core';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { WorkbookSubVersionStatus, WorkbookSubVersionType } from 'src/modules/workbook/workbook.enum';
import { User } from './user.model';
import { WorkbookVersion } from './workbook-version.model';
import { Workbook } from './workbook.model';

export type WorkbookSubVersionDocument = HydratedDocument<WorkbookSubVersion>;

@Schema({ timestamps: true, collection: 'workbook-sub-versions' })
export class WorkbookSubVersion {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({
    type: Types.Decimal128,
    required: true,
    get: (v?: Types.Decimal128) => v?.toString(),
    set: (v: number | string) => Types.Decimal128.fromString(String(v)),
    default: '1.1',
  })
  version: Types.Decimal128 | string;

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

  @Prop({ type: Types.ObjectId, ref: 'WorkbookVersion', required: false, default: null })
  workbookVersion: WorkbookVersion;

  @Prop({ type: String })
  snapshotFileKey?: string;

  @Prop({ type: String, enum: WorkbookSubVersionType, required: true })
  type: WorkbookSubVersionType;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  submittedBy?: User;

  @Prop({ type: Date, required: false })
  submittedAt?: Date;
}

export const WorkbookSubVersionSchema = SchemaFactory.createForClass(WorkbookSubVersion);