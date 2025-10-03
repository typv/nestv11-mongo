import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PermissionCode } from 'src/common/enums';
import { BaseDocument, BaseModel } from 'src/data-access/models/base.model';

export type PermissionDocument = BaseDocument<Permission>;

@Schema({ timestamps: true, collection: 'permissions' })
export class Permission extends BaseModel {
  @Prop({ enum: PermissionCode, required: true })
  code: PermissionCode;

  @Prop({ type: String, required: true, unique: false })
  name: string;

  @Prop({ type: String, default: null })
  description?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
