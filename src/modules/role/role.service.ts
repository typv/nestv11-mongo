import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/modules/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from 'src/models';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RoleListResponseDto } from 'src/modules/role/dto/response/role-list-response.dto';
import { plainToInstance } from 'class-transformer';
import { RoleCode } from 'src/common/enums';

@Injectable()
export class RoleService extends BaseService {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>
  ) {
    super();
    this.logger = this.logger.child({ context: RoleService.name });
  }

  async findAll(): Promise<RoleListResponseDto[]> {
    const roles = await this.roleModel.find({ code: { $ne: RoleCode.Admin } }).exec();

    return plainToInstance(RoleListResponseDto, roles, {
      excludeExtraneousValues: true,
    });
  }
}
