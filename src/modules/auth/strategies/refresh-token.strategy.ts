import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ERROR_RESPONSE } from 'src/common/constants';
import { JwtTokenType, RoleCode, UserType } from 'src/common/enums';
import { ServerException } from 'src/exceptions';
import { JwtPayload, UserRequestPayload } from 'src/modules/auth/auth.interface';
import { RedisService } from 'src/modules/base/redis';
import { jwtConfiguration } from '../../../config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private redisService: RedisService,
    @Inject(jwtConfiguration.KEY) private jwtConfig: ConfigType<typeof jwtConfiguration>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserRequestPayload> {
    const { id, email, jti, type } = payload;
    if (type !== JwtTokenType.RefreshToken)
      throw new ServerException(ERROR_RESPONSE.INVALID_TOKEN_USAGE);

    // Check valid token
    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    const isTokenValid = await this.redisService.getValue<string>(userTokenKey);
    if (!isTokenValid) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    const user: User = await this.userModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!user) throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    return {
      id,
      email,
      jti,
      userType: user.userType,
    };
  }
}
