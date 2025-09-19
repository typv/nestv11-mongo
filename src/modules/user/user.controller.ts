import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  GetMyInformationResponseDto,
  GetUserInformationResponseDto,
  UpdateUserAvatarResponseDto,
  UpdateUserProfileBodyDto,
  UpdateUserProfileResponseDto,
} from './dto';
import { UserService } from './user.service';
import { IMAGE_FILE_MIME_TYPES } from '../../common/constants';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { SwaggerApiDocument, User } from '../../decorators';
import { FileValidationPipe } from '../../pipes';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: GetMyInformationResponseDto,
    },
    operation: {
      operationId: 'getMyInformation',
      summary: 'Get getMyInformation',
    },
  })
  getMyInformation(@User('id') id: string): Promise<GetMyInformationResponseDto> {
    return this.userService.getMyInformation(id);
  }

  @Get('info/:id')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: GetUserInformationResponseDto,
    },
    operation: {
      operationId: 'getUserInformation',
      summary: 'Get getUserInformation',
    },
  })
  getUserInformation(
    @Param('id') userId: string,
  ): Promise<GetUserInformationResponseDto> {
    return this.userService.getUserInformation(userId);
  }

  @Patch('profile')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: UpdateUserProfileResponseDto,
    },
    body: { type: UpdateUserProfileBodyDto, required: true },
    operation: {
      operationId: 'updateUserProfile',
      summary: 'Api updateUserProfile',
    },
  })
  async updateUserProfile(
    @Body() body: UpdateUserProfileBodyDto,
    @User('id') id: string,
  ): Promise<UpdateUserProfileResponseDto> {
    return this.userService.updateUserProfile(body, id);
  }

  @Patch('avatar')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: UpdateUserAvatarResponseDto,
    },
    operation: {
      operationId: 'updateUserAvatar',
      summary: 'Api updateUserAvatar',
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateUserAvatar(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: IMAGE_FILE_MIME_TYPES,
      }),
    )
    file: Express.Multer.File,
    @User('id') id: string,
  ): Promise<UpdateUserAvatarResponseDto> {
    return this.userService.updateUserAvatar(file, id);
  }

  @Delete('account')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: SuccessResponseDto,
    },
    operation: {
      operationId: 'deleteAccount',
      summary: 'Api deleteAccount',
    },
  })
  async deleteAccount(@User('id') userId: string): Promise<SuccessResponseDto> {
    return this.userService.deleteAccount(userId);
  }
}
