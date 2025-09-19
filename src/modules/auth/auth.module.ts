import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  chatConfiguration,
  codeExpiresConfiguration,
  jwtConfiguration,
} from 'src/config';
import { AuthStrategy, RefreshTokenStrategy } from 'src/modules/auth/strategies';
import { GoogleAuthModule } from 'src/modules/base/google-auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../../models';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfiguration, codeExpiresConfiguration, chatConfiguration],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
