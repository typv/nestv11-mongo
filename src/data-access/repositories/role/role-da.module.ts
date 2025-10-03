import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/data-access/models';
import { RoleRepository } from 'src/data-access/repositories/role/role.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleRepository],
  exports: [RoleRepository],
})
export class RoleDAModule {}