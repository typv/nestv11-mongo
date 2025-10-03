import { BaseRepository } from 'src/data-access/repositories/base.repository';
import { Role, RoleDocument } from 'src/data-access/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class RoleRepository extends BaseRepository<Role, RoleDocument> {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}