import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { BaseService } from 'src/modules/base.service';
import { Logger } from 'winston';
import {
  GetMyInformationResponseDto,
  GetUserInformationResponseDto,
  UpdateUserProfileBodyDto,
  UpdateUserProfileResponseDto,
} from './dto';
import { ERROR_RESPONSE } from '../../common/constants';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { Role } from '../../common/enums';
import { ServerException } from '../../exceptions';
import { User, UserDocument } from '../../models';
import { UploadService } from '../upload';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly uploadService: UploadService,
  ) {
    super();
    this.logger = this.logger.child({ context: UserService.name });
  }

  async getUserByOrThrow(where: FilterQuery<UserDocument>) {
    const user = await this.userModel.findOne(where).exec();
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    return user;
  }

  async getUserInformation(userId: string) {
    const _id = new mongoose.Types.ObjectId(userId);
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    // Convert user to response DTO
    const userInfo = plainToInstance(GetUserInformationResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return userInfo;
  }

  async getMyInformation(id: string) {
    const _id = new mongoose.Types.ObjectId(id);
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    const userInfo = plainToInstance(GetMyInformationResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return userInfo;
  }

  async updateUserProfile(
    body: UpdateUserProfileBodyDto,
    userId: string,
  ): Promise<UpdateUserProfileResponseDto> {
    const user = await this.getUserByOrThrow({
      _id: new mongoose.Types.ObjectId(userId),
    });

    await this.userModel.updateOne({ _id: user._id }, { $set: body });

    return { success: true };
  }

  async updateUserAvatar(file: Express.Multer.File, userId: string) {
    const user = await this.getUserByOrThrow({
      _id: new mongoose.Types.ObjectId(userId),
    });

    const fileUrl = await this.uploadService.uploadFile(file, 'avatar');
    await this.userModel.updateOne({ _id: user._id }, { $set: { avatar: fileUrl } });

    return { success: true };
  }

  async deleteAccount(userId: string): Promise<SuccessResponseDto> {
    const user = await this.userModel.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    await this.userModel.deleteOne({ _id: user._id });
    return this.responseSuccess();
  }

  async listUsers(): Promise<GetUserInformationResponseDto[]> {
    const users = await this.userModel.find().exec();

    return users.map((user) =>
      plainToInstance(GetUserInformationResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
