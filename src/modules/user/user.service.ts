import { Inject, Injectable } from '@nestjs/common';
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
import { ServerException } from '../../exceptions';
import { UploadService } from '../upload';
import { UserRepository } from 'src/repositories';
import { UserDocument } from 'src/models';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly uploadService: UploadService,
    private readonly userRepository: UserRepository,
  ) {
    super();
    this.logger = this.logger.child({ context: UserService.name });
  }

  async getUserByOrThrow(where: FilterQuery<UserDocument>): Promise<UserDocument> {
    const user = await this.userRepository.findOne(where);
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    return user;
  }

  async getUserInformation(userId: string) {
    const user = await this.userRepository.findById(userId);
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
    const user = await this.userRepository.findOneUserAndRole(id);
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

    await this.userRepository.updateOne({ _id: user._id }, { $set: body });

    return { success: true };
  }

  async updateUserAvatar(file: Express.Multer.File, userId: string) {
    const user = await this.getUserByOrThrow({
      _id: new mongoose.Types.ObjectId(userId),
    });

    const fileUrl = await this.uploadService.uploadFile(file, 'avatar');
    await this.userRepository.updateOne({ _id: user._id }, { $set: { avatar: fileUrl } });

    return { success: true };
  }

  async deleteAccount(userId: string): Promise<SuccessResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ServerException(ERROR_RESPONSE.USER_NOT_FOUND);
    }

    await this.userRepository.deleteOne({ _id: user._id });
    return this.responseSuccess();
  }

  async listUsers(): Promise<GetUserInformationResponseDto[]> {
    const users = await this.userRepository.findUserAndRole();

    return users.map((user) =>
      plainToInstance(GetUserInformationResponseDto,{
        ...user,
        role: user.role ? (user.role as any).name : null,
      }, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
