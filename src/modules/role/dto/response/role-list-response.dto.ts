import { PropertyDto } from 'src/decorators';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class RoleListResponseDto {
  @PropertyDto()
  @Transform(({ value }) => value instanceof Types.ObjectId ? value.toString() : value)
  _id: number;

  @PropertyDto()
  name: string;

  @PropertyDto()
  code: string;

  @PropertyDto()
  description: string;
}