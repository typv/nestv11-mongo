import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ERROR_RESPONSE } from 'src/common/constants';
import { RoleCode, UserType } from 'src/common/enums';
import { ACCESS_ROLES_KEY, IS_PUBLIC_KEY, USER_TYPES_KEY } from 'src/decorators';
import { ServerException } from 'src/exceptions';
import { UserRequestPayload } from 'src/modules/auth';

@Injectable()
export class RoleBasedAccessControlGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: UserRequestPayload,
    info: any,
    context: ExecutionContext,
  ): any {
    // Skip public routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return user ?? true;
    }

    // Check if authorization is needed
    const allowedRoles = this.reflector.getAllAndOverride<RoleCode[]>(ACCESS_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const allowedUserTypes = this.reflector.getAllAndOverride<UserType[]>(
      USER_TYPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no authorization rules are defined, allow access
    if (!allowedRoles?.length && !allowedUserTypes?.length) {
      return user;
    }

    // Check role-based access
    if (allowedRoles?.length && !allowedRoles.includes(user.role!)) {
      throw new ServerException(ERROR_RESPONSE.RESOURCE_FORBIDDEN);
    }

    // Check user type if user types are specified
    if (allowedUserTypes?.length) {
      if (!user.userType || !allowedUserTypes.includes(user.userType)) {
        throw new ServerException(ERROR_RESPONSE.RESOURCE_FORBIDDEN);
      }
    }

    return user;
  }
}
