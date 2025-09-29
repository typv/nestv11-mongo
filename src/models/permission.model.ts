import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PermissionCode } from 'src/common/enums';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true, collection: 'permissions' })
export class Permission {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ enum: PermissionCode, required: true })
  code: PermissionCode;

  @Prop({ type: String, required: true, unique: false })
  name: string;

  @Prop({ type: String, default: null })
  description?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
