import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PermissionCode, RoleCode } from 'src/common/enums';
import { BaseDocument, BaseModel } from 'src/data-access/models/base.model';

export type RoleDocument = BaseDocument<Role>;

@Schema({ timestamps: true, collection: 'roles' })
export class Role extends BaseModel {

  @Prop({ enum: RoleCode, required: true })
  code: RoleCode;

  @Prop({ type: String, required: true, unique: false })
  name: string;

  @Prop({ type: String, default: null })
  description?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  permissions: PermissionCode[] | string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
