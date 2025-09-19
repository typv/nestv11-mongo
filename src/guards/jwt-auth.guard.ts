import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ERROR_RESPONSE } from 'src/common/constants';
import { IS_PUBLIC_KEY } from 'src/decorators';
import { ServerException } from 'src/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Allow public routes
    if (isPublic) {
      return true;
    }

    // Only validate token - no authorization logic
    const isGrand = await super.canActivate(context);
    return !!isGrand;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    }

    return user;
  }
}
