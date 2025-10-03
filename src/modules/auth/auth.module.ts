import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  chatConfiguration,
  codeExpiresConfiguration,
  jwtConfiguration,
} from 'src/config';
import { AuthStrategy, RefreshTokenStrategy } from 'src/modules/auth/strategies';
import { GoogleAuthModule } from 'src/modules/base/google-auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RoleDAModule, UserDAModule } from 'src/repositories';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfiguration, codeExpiresConfiguration, chatConfiguration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfiguration)],
      useFactory: (jwtConfig: ConfigType<typeof jwtConfiguration>) => ({
        global: true,
        secret: jwtConfig.secret,
        signOptions: {
          algorithm: jwtConfig.algorithm,
        },
      }),
      inject: [jwtConfiguration.KEY],
    }),
    GoogleAuthModule,
    UserDAModule,
    RoleDAModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
