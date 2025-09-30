import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IResources, IStyleData, Nullable, Workbook } from '@univerjs/core';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './user.model';
import { Worksheet } from './worksheet.model';
import { WorkbookPermission } from '../common/enums/workbook.enum';
import { LocaleType } from '../modules/workbook/dto';
import { WorkbookVersionStatus } from 'src/modules/workbook/workbook.enum';

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

  @Prop({ type: String, required: false })
  appVersion?: string;

  @Prop({ type: String, enum: LocaleType, required: true })
  locale: LocaleType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  styles: Record<string, Nullable<IStyleData>>;

  @Prop({ type: Array, required: true })
  sheetOrder: string[];

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  resources: IResources;

  @Prop({ type: Number, required: true, default: 1 })
  version: number;

  @Prop({ type: Boolean, required: true, default: true })
  isCurrentActive: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'Worksheet', required: true })
  sheets: Worksheet[];

  @Prop({ type: Types.ObjectId, ref: 'workbooks', required: true })
  workbook: Workbook;

  @Prop({
    type: String,
    enum: Object.values(WorkbookVersionStatus),
    required: true,
    default: WorkbookVersionStatus.Awaiting
  })
  status: WorkbookVersionStatus;
}

export const WorkbookVersionSchema = SchemaFactory.createForClass(WorkbookVersion);

WorkbookVersionSchema.index({ workbook: 1, version: 1 }, { unique: true });
WorkbookVersionSchema.index({ workbook: 1, version: -1 });
