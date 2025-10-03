import { BaseRepository } from 'src/repositories/base.repository';
import { Permission, PermissionDocument } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class PermissionRepository extends BaseRepository<Permission, PermissionDocument> {
  constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) {
    super(permissionModel);
  }
}