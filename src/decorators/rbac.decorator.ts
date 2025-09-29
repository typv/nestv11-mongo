import { SetMetadata } from '@nestjs/common';
import { RoleCode } from 'src/common/enums';

export const ACCESS_ROLES_KEY = 'roles';
export const RoleBaseAccessControl = (...roles: RoleCode[]) => SetMetadata(ACCESS_ROLES_KEY, roles);
