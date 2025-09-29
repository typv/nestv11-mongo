import { Controller, Get, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { SwaggerApiDocument } from 'src/decorators';
import { RoleListResponseDto } from 'src/modules/role/dto/response/role-list-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: RoleListResponseDto,
    },
    operation: {
      operationId: 'roleList',
      summary: 'Api roleList',
      description: 'Role List',
    },
  })
  @Get()
  findAll(): Promise<RoleListResponseDto[]> {
    return this.roleService.findAll();
  }
}
