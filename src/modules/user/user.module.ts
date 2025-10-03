import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { codeExpiresConfiguration } from 'src/config';
import { UploadModule } from 'src/modules/upload';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDAModule } from 'src/repositories';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [codeExpiresConfiguration] }),
    UploadModule,
    UserDAModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
