import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WorkbookApprovedStatus } from 'src/modules/workbook/workbook.enum';
import { User } from './user.model';
import { WorkbookPermission, WorkbookStage } from '../common/enums/workbook.enum';

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

export type WorkbookDocument = HydratedDocument<Workbook>;

@Schema({ timestamps: true, collection: 'workbooks' })
export class Workbook {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  univerWorkbookId: string;

  @Prop({ type: String, required: true, unique: false })
  name: string;

  @Prop({
    type: String,
    enum: Object.values(WorkbookApprovedStatus),
    required: true,
    default: WorkbookApprovedStatus.InProgress,
  })
  approvedStatus: WorkbookApprovedStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: [Collaborator], default: [] })
  collaborators: Collaborator[];

  @Prop({
    type: String,
    enum: WorkbookStage,
    required: true,
    default: WorkbookStage.IMA_UPDATE_INPUTS,
  })
  currentStage: WorkbookStage;
}

export const WorkbookSchema = SchemaFactory.createForClass(Workbook);

WorkbookSchema.index({ univerWorkbookId: 1, owner: 1 }, { unique: true });
