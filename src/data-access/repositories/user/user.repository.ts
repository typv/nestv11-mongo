import { BaseRepository } from 'src/data-access/repositories/base.repository';
import { User, UserDocument } from 'src/data-access/models';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

export class UserRepository extends BaseRepository<User, UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async findOneUserAndRole(userId: string): Promise<UserDocument> {
    const _id = new mongoose.Types.ObjectId(userId);
    return this.userModel.findById(_id).populate('role').exec();
  }

  async findUserAndRole(): Promise<UserDocument[]> {
    return this.userModel.find()
      .populate('role')
      .lean()
      .exec();
  }
}