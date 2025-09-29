import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserType } from '../common/enums';
import { Role } from 'src/models/role.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

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
