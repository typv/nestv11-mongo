import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BaseDocument<T> = HydratedDocument<T>;

@Schema({ _id: false })
export abstract class BaseModel {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}