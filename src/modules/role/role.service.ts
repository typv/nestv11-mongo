import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/modules/base.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RoleListResponseDto } from 'src/modules/role/dto/response/role-list-response.dto';
import { plainToInstance } from 'class-transformer';
import { RoleCode } from 'src/common/enums';
import { RoleRepository } from 'src/data-access/repositories';

@Injectable()
export class RoleService extends BaseService {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly roleRepository: RoleRepository
  ) {
    super();
    this.logger = this.logger.child({ context: RoleService.name });
  }

  async findAll(): Promise<RoleListResponseDto[]> {
    const roles = await this.roleRepository.find({ code: { $ne: RoleCode.Admin } });

    return plainToInstance(RoleListResponseDto, roles, {
      excludeExtraneousValues: true,
    });
  }
}
