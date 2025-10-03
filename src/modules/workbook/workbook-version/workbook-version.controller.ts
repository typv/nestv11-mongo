import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { WorkbookVersionSnapshotResponseDto } from 'src/modules/workbook/workbook-version/dto/response/workbook-version-snapshot-response.dto';
import {
  CreateWorkbookSubVersionDto,
  CreateWorkbookSubVersionResponseDto,
  ReviewWorkbookSubVersionDto,
  SubmitVersionDto,
  SubVersionResponseDto,
  VersionResponseDto,
} from './dto';
import { WorkbookVersionService } from './workbook-version.service';
import { SuccessResponseDto } from '../../../common/dto/success-response.dto';
import { RoleCode } from '../../../common/enums';
import { RoleBaseAccessControl, SwaggerApiDocument, User } from '../../../decorators';

@Controller('workbook/version')
@ApiTags('Workbook Version')
@ApiBearerAuth()
@RoleBaseAccessControl(RoleCode.IMA, RoleCode.IMS, RoleCode.PMA, RoleCode.PMS)
export class WorkbookVersionController {
  constructor(private readonly workbookVersionService: WorkbookVersionService) {}

  @RoleBaseAccessControl(RoleCode.IMA, RoleCode.PMA)
  @Post('sub-version')
  @FormDataRequest()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
    },
    body: { type: CreateWorkbookSubVersionDto, required: true },
    operation: {
      operationId: 'createSubVersion',
      summary: 'Create sub version',
    },
  })
  createSubVersion(
    @User('id') userId: string,
    @User('role') role: RoleCode,
    @Body() body: CreateWorkbookSubVersionDto,
  ): Promise<CreateWorkbookSubVersionResponseDto> {
    return this.workbookVersionService.createWorkbookSubVersion(userId, role, body);
  }

  @Post('submit')
  @FormDataRequest()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
    },
    body: { type: SubmitVersionDto, required: true },
    operation: {
      operationId: 'submitWorkbookVersion',
      summary: 'Submit workbook version',
    },
  })
  submitWorkbookVersion(
    @User('role') role: RoleCode,
    @Body() body: SubmitVersionDto,
  ): Promise<SuccessResponseDto> {
    return this.workbookVersionService.submitWorkbookVersion(role, body);
  }

  @RoleBaseAccessControl(RoleCode.IMS, RoleCode.PMA, RoleCode.PMS)
  @Post('sub-version/review')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
    },
    body: { type: ReviewWorkbookSubVersionDto, required: true },
    operation: {
      operationId: 'reviewSubVersion',
      summary: 'Review sub version',
    },
  })
  reviewSubVersion(
    @User('id') userId: string,
    @User('role') role: RoleCode,
    @Body() body: ReviewWorkbookSubVersionDto,
  ): Promise<SuccessResponseDto> {
    return this.workbookVersionService.reviewWorkbookSubVersion(userId, role, body);
  }

  @Get(':workbookId/list')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: VersionResponseDto,
    },
    operation: {
      operationId: 'workbookList',
      summary: 'Api workbookList',
      description: 'Workbook List',
    },
  })
  versionList(
    @User('id') userId: string,
    @Param('workbookId') workbookId: string,
  ): Promise<VersionResponseDto[]> {
    return this.workbookVersionService.versionList(userId, workbookId);
  }

  @Get('sub-version/:subVersionId')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: SubVersionResponseDto,
    },
    operation: {
      operationId: 'subversionDetail',
      summary: 'Api subversionDetail',
      description: 'Subversion detail',
    },
  })
  subversionDetail(
    @Param('subVersionId') subVersionId: string,
  ): Promise<SubVersionResponseDto> {
    return this.workbookVersionService.subversionDetail(subVersionId);
  }

  @Get('sub-version/:subVersionId/snapshot')
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: WorkbookVersionSnapshotResponseDto,
    },
    operation: {
      operationId: 'subversionSnapshot',
      summary: 'Api getSubversionSnapshot',
      description: 'Get Subversion Snapshot',
    },
  })
  async getSubversionSnapshot(
    @Param('subVersionId') subVersionId: string,
  ): Promise<WorkbookVersionSnapshotResponseDto> {
    return this.workbookVersionService.getSubversionSnapshot(subVersionId);
  }
}
