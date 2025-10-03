import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Connection } from 'mongoose';
import { appConfiguration, codeExpiresConfiguration, jwtConfiguration } from 'src/config';
import { EmailService } from 'src/modules/base/email';
import { GoogleAuthService } from 'src/modules/base/google-auth/google-auth.service';
import { RedisService } from 'src/modules/base/redis';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, UserRequestPayload } from './auth.interface';
import {
  LoginBodyDto,
  ResetPasswordBodyDto,
  ResetPasswordResponseDto,
  SendResetPasswordLinkBodyDto,
  SendResetPasswordResponseDto,
  SignUpBodyDto,
  VerifyEmailBodyDto,
  VerifyEmailResponseDto,
  VerifyResetPasswordLinkBodyDto,
  VerifyResetPasswordLinkResponseDto,
} from './dto';
import { ERROR_RESPONSE } from '../../common/constants';
import { AccountAction, JwtTokenType, RoleCode, UserType } from '../../common/enums';
import { HashUtil } from '../../common/utilities';
import { getTtlValue } from '../../common/utilities/time.util';
import { Role, User, UserDocument } from 'src/data-access/models';
import { ServerException } from '../../exceptions';
import { RoleRepository, UserRepository } from 'src/data-access/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
    private readonly googleAuthService: GoogleAuthService,
    @Inject(appConfiguration.KEY)
    private readonly appConfig: ConfigType<typeof appConfiguration>,
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
    @Inject(codeExpiresConfiguration.KEY)
    private readonly codeExpiresConfig: ConfigType<typeof codeExpiresConfiguration>,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    @InjectConnection() private connection: Connection,
  ) {}

  async login(body: LoginBodyDto) {
    const { email, password } = body;
    const user = await this.userRepository.findOne({ email });

    if (!user?.password) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    const isPasswordValid = await HashUtil.verifyHashed(password, user.password);
    if (!isPasswordValid) {
      throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);
    }

    return this.manageUserToken(user);
  }

  async signUp(body: SignUpBodyDto) {
    const { email, password, roleId } = body;
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ServerException(ERROR_RESPONSE.USER_ALREADY_EXISTS);

    const role = await this.roleRepository.findOne({ _id: new Types.ObjectId(roleId) });
    if (!role) throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Role'));
    if (role.code === RoleCode.Admin) throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('Role'));

    const hashedPassword = await HashUtil.hashData(password);

    const userData = {
      _id: new mongoose.Types.ObjectId(),
      ...body,
      isActive: true,
      emailVerified: false,
      password: hashedPassword,
      userType: UserType.User,
      role: role._id,
    };
    const newUser = await this.userRepository.create(userData);

    return this.manageUserToken(newUser);
  }

  async logout(userPayload: UserRequestPayload) {
    const { id, jti } = userPayload;

    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    await this.redisService.deleteKey(userTokenKey);

    return { success: true };
  }

  async refreshToken(userPayload: UserRequestPayload) {
    const accessToken = await this.generateToken(
      userPayload,
      JwtTokenType.AccessToken,
      this.jwtConfig.accessTokenExpiresIn,
    );

    return { accessToken };
  }

  async resendVerificationEmail(_id: string) {
    const user = await this.userRepository.findById(_id);
    if (!user) throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    if (user.emailVerified)
      throw new ServerException(ERROR_RESPONSE.EMAIL_ALREADY_VERIFIED);

    const token = uuidv4();
    const verifyUrl =
      this.appConfig.frontendUrl +
      '/redirect?email=' +
      encodeURIComponent(user.email) +
      '&token=' +
      token +
      '&action=' +
      AccountAction.VerifyEmail;

    // Send verify email
    await this.emailService.verifySignupMailer({
      email: user.email,
      name: user.firstName + ' ' + user.lastName,
      verifyUrl,
    });

    // Save token to redis
    await this.redisService.setValue<string>(
      this.redisService.getVerifyEmailKey(_id),
      token,
      getTtlValue(this.codeExpiresConfig.verifyEmail),
    );

    return { success: true };
  }

  async verifyEmail(body: VerifyEmailBodyDto): Promise<VerifyEmailResponseDto> {
    const { email, token } = body;

    const user = await this.userRepository.findOne({ email });
    if (!user) throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);

    const verifyEmailKey = this.redisService.getVerifyEmailKey(user._id.toString());
    const cachedToken = await this.redisService.getValue<string>(verifyEmailKey);
    if (!cachedToken || cachedToken !== token)
      throw new ServerException(ERROR_RESPONSE.LINK_EXPIRED);

    // Update redis
    await this.redisService.deleteKey(verifyEmailKey);
    await this.redisService.deleteByPattern(
      this.redisService.getUserTokenPattern(user._id.toString()),
    );

    return this.manageUserToken(user);
  }

  async sendResetPasswordLink(
    body: SendResetPasswordLinkBodyDto,
  ): Promise<SendResetPasswordResponseDto> {
    const { email } = body;
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);

    const token = uuidv4();
    const tokenTtl = getTtlValue(this.codeExpiresConfig.resetPassword);
    const resetPasswordUrl =
      this.appConfig.frontendUrl +
      '/redirect?email=' +
      encodeURIComponent(user.email) +
      '&token=' +
      token +
      '&action=' +
      AccountAction.ResetPassword;

    // Send reset password link by email
    await this.emailService.forgotPasswordMailer({
      email,
      name: user.firstName + ' ' + user.lastName,
      resetPasswordUrl,
    });

    // Save token to redis
    await this.redisService.setValue<string>(
      this.redisService.getResetPasswordKey(user._id.toString()),
      token,
      tokenTtl,
    );
    return { success: true };
  }

  async verifyResetPasswordLink(
    body: VerifyResetPasswordLinkBodyDto,
  ): Promise<VerifyResetPasswordLinkResponseDto> {
    const { email, token } = body;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    const isValid = await this.isValidLink(user, token);
    return { isValid };
  }

  async resetPassword(body: ResetPasswordBodyDto): Promise<ResetPasswordResponseDto> {
    const { newPassword, email, token } = body;

    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    const isValidLink = await this.isValidLink(user, token);
    if (!isValidLink) {
      throw new ServerException(ERROR_RESPONSE.LINK_EXPIRED);
    }

    const isSamePassword =
      user.password && (await HashUtil.verifyHashed(newPassword, user.password));
    if (isSamePassword) {
      throw new ServerException(ERROR_RESPONSE.PASSWORD_NOT_CHANGED);
    }

    const hashedPassword = await HashUtil.hashData(newPassword);
    await this.userRepository.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
    );

    // Send email
    await this.emailService.passwordUpdatedMailer({
      email,
      name: user.firstName + ' ' + user.lastName,
    });

    // Update redis
    await this.redisService.deleteKey(
      this.redisService.getResetPasswordKey(user._id.toString()),
    );

    await this.redisService.deleteByPattern(
      this.redisService.getUserTokenPattern(user._id.toString()),
    );

    return { success: true };
  }

  private async manageUserToken(user: User) {
    const jti = uuidv4();
    const role = await this.roleRepository.findOne({ _id: user.role });
    const tokenPayload = {
      id: user._id.toString(),
      jti,
      email: user.email,
      role: role?.code,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        tokenPayload,
        JwtTokenType.AccessToken,
        this.jwtConfig.accessTokenExpiresIn,
      ),
      this.generateToken(
        tokenPayload,
        JwtTokenType.RefreshToken,
        this.jwtConfig.refreshTokenExpiresIn,
      ),
    ]);
    await this.redisService.setValue<string>(
      this.redisService.getUserTokenKey(user._id.toString(), jti),
      'deviceId',
      getTtlValue(this.jwtConfig.refreshTokenExpiresIn),
    );

    return { accessToken, refreshToken };
  }

  private async generateToken(
    payload: Partial<JwtPayload>,
    type: JwtTokenType,
    expiresIn: number | string,
  ) {
    const tokenPayload: JwtPayload = {
      id: payload.id,
      email: payload.email,
      jti: payload.jti,
      type,
      ...(type === JwtTokenType.AccessToken && { role: payload.role }),
    };

    return this.jwtService.signAsync(tokenPayload, { expiresIn });
  }

  private async isValidLink(user: UserDocument, token: string): Promise<boolean> {
    const cacheKey = this.redisService.getResetPasswordKey(user._id.toString());
    const cachedToken = await this.redisService.getValue<string>(cacheKey);
    return cachedToken === token;
  }
}
