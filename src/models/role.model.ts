import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoleCode } from 'src/common/enums';
import { User } from 'src/models/user.model';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true, collection: 'roles' })
export class Role {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ enum: RoleCode, required: true })
  code: RoleCode;

  @Prop({ type: String, required: true, unique: false })
  name: string;

  @Prop({ type: String, default: null })
  description?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
