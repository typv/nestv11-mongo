import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWorkbookData } from '@univerjs/core';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './user.model';
import { WorkbookVersion } from './workbook-version.model';
import { Workbook } from './workbook.model';
import { WorkbookSubVersionStatus } from 'src/modules/workbook/workbook.enum';

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

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  changeSet: Partial<IWorkbookData>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  updatedWorkbookBy: User;

  @Prop({ type: Date, required: false })
  updatedWorkbookAt?: Date;

  @Prop({
    type: Number,
    enum: WorkbookSubVersionStatus,
    required: true,
    default: WorkbookSubVersionStatus.PENDING,
  })
  status: WorkbookSubVersionStatus;

  @Prop({ type: String, required: false })
  rejectedReason: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  reviewedBy?: User;

  @Prop({ type: Date, required: false })
  reviewedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Workbook', required: true })
  workbook: Workbook;

  @Prop({ type: Types.ObjectId, ref: 'WorkbookVersion', required: false, default: null })
  workbookVersion: WorkbookVersion;
}

export const WorkbookSubVersionSchema = SchemaFactory.createForClass(WorkbookSubVersion);
