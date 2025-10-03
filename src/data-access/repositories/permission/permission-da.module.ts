import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from 'src/data-access/models';
import { PermissionRepository } from 'src/data-access/repositories/permission/permission.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  providers: [PermissionRepository],
  exports: [PermissionRepository],
})
export class PermissionDAModule {}