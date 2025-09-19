import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshToken, SwaggerApiDocument, User } from 'src/decorators';
import { Public } from 'src/decorators/public.decorator';
import { UserRequestPayload } from './auth.interface';
import { AuthService } from './auth.service';
import {
  Login2faRequiredResponseDto,
  LoginBodyDto,
  LoginResponseDto,
  LogoutResponseDto,
  RefreshTokenResponseDto,
  ResendVerificationEmailResponseDto,
  ResetPasswordBodyDto,
  ResetPasswordResponseDto,
  SendResetPasswordLinkBodyDto,
  SendResetPasswordResponseDto,
  SignUpBodyDto,
  SignUpResponseDto,
  VerifyEmailBodyDto,
  VerifyEmailResponseDto,
  VerifyResetPasswordLinkBodyDto,
  VerifyResetPasswordLinkResponseDto,
} from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @SwaggerApiDocument({
    response: [
      { status: HttpStatus.ACCEPTED, type: Login2faRequiredResponseDto },
      { status: HttpStatus.OK, type: LoginResponseDto },
    ],
    body: { type: LoginBodyDto, required: true },
    operation: {
      operationId: `login`,
      summary: `Api internalLogin`,
      description: `Internal login with email and password`,
    },
    extra: { isPublic: true },
  })
  async login(
    @Body() body: LoginBodyDto,
  ): Promise<LoginResponseDto | Login2faRequiredResponseDto> {
    return this.authService.login(body);
  }

  @Post('sign-up')
  @Public()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: SignUpResponseDto,
    },
    body: { type: SignUpBodyDto, required: true },
    operation: {
      operationId: `signUp`,
      summary: `Api internalSignUp`,
      description: `Internal sign up with email and password`,
    },
    extra: { isPublic: true },
  })
  async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }

  @Post('resend-verification-email')
  @ApiBearerAuth()
  @SwaggerApiDocument({
    response: { type: ResendVerificationEmailResponseDto },
    operation: {
      operationId: `resendVerificationEmail`,
      summary: `Api resendVerificationEmail`,
      description: `Resend verification email to user`,
    },
  })
  async resendVerificationEmail(
    @User('id') id: string,
  ): Promise<ResendVerificationEmailResponseDto> {
    return this.authService.resendVerificationEmail(id);
  }

  @Post('verify-email')
  @Public()
  @SwaggerApiDocument({
    response: { type: VerifyEmailResponseDto },
    body: { type: VerifyEmailBodyDto, required: true },
    operation: {
      operationId: `verifyEmail`,
      summary: `Api verifyEmail`,
      description: `Verify user email`,
    },
    extra: { isPublic: true },
  })
  async verifyEmail(@Body() body: VerifyEmailBodyDto): Promise<VerifyEmailResponseDto> {
    return this.authService.verifyEmail(body);
  }

  @Post('refresh-token')
  @RefreshToken()
  @ApiBearerAuth()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: RefreshTokenResponseDto,
    },
    operation: {
      operationId: `refreshToken`,
      summary: `Api refreshToken`,
      description: `Refresh token when access token expired`,
    },
  })
  async refreshToken(@User() userPayload: UserRequestPayload) {
    return this.authService.refreshToken(userPayload);
  }

  @Post('logout')
  @ApiBearerAuth()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
    },
    operation: {
      operationId: `logout`,
      summary: `Api logout`,
      description: `User logout`,
    },
  })
  async logout(@User() userPayload: UserRequestPayload): Promise<LogoutResponseDto> {
    return this.authService.logout(userPayload);
  }

  @Post('send-reset-link')
  @Public()
  @SwaggerApiDocument({
    response: { type: SendResetPasswordResponseDto },
    body: { type: SendResetPasswordLinkBodyDto, required: true },
    operation: {
      operationId: `sendResetPasswordLink`,
      summary: `Api sendResetPasswordLink`,
      description: `Send reset password link to user`,
    },
  })
  async sendResetPasswordLink(
    @Body() body: SendResetPasswordLinkBodyDto,
  ): Promise<SendResetPasswordResponseDto> {
    return this.authService.sendResetPasswordLink(body);
  }

  @Post('verify-reset-link')
  @Public()
  @SwaggerApiDocument({
    response: { type: VerifyResetPasswordLinkResponseDto },
    body: { type: VerifyResetPasswordLinkBodyDto, required: true },
    operation: {
      operationId: `verifyResetPasswordLink`,
      summary: `Api verifyResetPasswordLink`,
      description: `Verify reset password link`,
    },
  })
  async verifyForgotPasswordCode(
    @Body() body: VerifyResetPasswordLinkBodyDto,
  ): Promise<VerifyResetPasswordLinkResponseDto> {
    return this.authService.verifyResetPasswordLink(body);
  }

  @Post('reset-password')
  @Public()
  @SwaggerApiDocument({
    response: { type: ResetPasswordResponseDto },
    body: { type: ResetPasswordBodyDto, required: true },
    operation: {
      operationId: `resetPassword`,
      summary: `Api resetPassword`,
      description: `Reset user password`,
    },
  })
  async resetPassword(
    @Body() body: ResetPasswordBodyDto,
  ): Promise<ResetPasswordResponseDto> {
    return this.authService.resetPassword(body);
  }
}
