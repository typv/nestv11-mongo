import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleConfig from 'src/config/google.config';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [ConfigModule.forFeature(googleConfig)],
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
