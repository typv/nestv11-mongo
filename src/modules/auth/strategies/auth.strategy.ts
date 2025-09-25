import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ERROR_RESPONSE } from 'src/common/constants';
import { JwtTokenType, UserType } from 'src/common/enums';
import { ServerException } from 'src/exceptions';
import { JwtPayload, UserRequestPayload } from 'src/modules/auth/auth.interface';
import { RedisService } from 'src/modules/base/redis';
import { jwtConfiguration } from '../../../config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private redisService: RedisService,
    @Inject(jwtConfiguration.KEY) private jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserRequestPayload> {
    const { id, email, jti, type, role } = payload;
    if (type !== JwtTokenType.AccessToken)
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    // Check valid token
    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    const isTokenValid = await this.redisService.getValue<string>(userTokenKey);
    if (!isTokenValid) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    // const user = await this.userRepo.findOneBy({ id });
    const user = {
      id,
      email,
      jti,
      role,
      emailVerified: true,
      userType: UserType.SelfEmployed,
      isActive: true,
    };
    if (!user) throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    return {
      id,
      email,
      jti,
      role,
      emailVerified: user.emailVerified,
      userType: user.userType,
    };
  }
}
