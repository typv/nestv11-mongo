import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Role, RoleSchema,
} from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
    ])
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
