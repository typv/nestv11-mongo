import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from 'src/models';
import { PermissionRepository } from 'src/repositories/permission/permission.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  providers: [PermissionRepository],
  exports: [PermissionRepository],
})
export class PermissionDAModule {}