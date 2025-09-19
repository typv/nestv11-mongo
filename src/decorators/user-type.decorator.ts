import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/common/enums';

export const USER_TYPES_KEY = 'user_types';
export const AllowUserTypes = (...types: UserType[]) =>
  SetMetadata(USER_TYPES_KEY, types); 