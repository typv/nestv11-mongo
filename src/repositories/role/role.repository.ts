import { BaseRepository } from 'src/repositories/base.repository';
import { Role, RoleDocument } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class RoleRepository extends BaseRepository<Role, RoleDocument> {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}