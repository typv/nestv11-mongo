import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { codeExpiresConfiguration } from 'src/config';
import { UploadModule } from 'src/modules/upload';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '../../models';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [codeExpiresConfiguration] }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UploadModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
