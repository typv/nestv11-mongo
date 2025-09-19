import { applyDecorators } from '@nestjs/common';
import { Role, UserType } from 'src/common/enums';
import { RoleBaseAccessControl } from './rbac.decorator';
import { AllowUserTypes } from './user-type.decorator';

export function AccessControl(
  roles: Role[],
  userTypes?: UserType[],
) {
  const decorators = [
    RoleBaseAccessControl(...roles),
  ];

  if (userTypes?.length) {
    decorators.push(AllowUserTypes(...userTypes));
  }

  return applyDecorators(...decorators);
} 