import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserType } from '../common/enums';
import { Role } from 'src/models/role.model';
import { BaseDocument, BaseModel } from 'src/models/base.model';

export type UserDocument = BaseDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User extends BaseModel {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  fullName?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ enum: UserType, default: UserType.User })
  userType: UserType;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: Role.name,
    required: true
  })
  role: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
