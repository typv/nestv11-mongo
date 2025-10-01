import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import {
  CreateWorkbookSubVersionDto,
  ReviewWorkbookSubVersionDto,
  SubmitVersionDto,
  UpdateWorkbookSubVersionDto,
  VersionResponseDto
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
  @Post(':workbookId/create-sub-version')
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
    @Param('workbookId') workbookId: string,
    @Body() body: CreateWorkbookSubVersionDto,
  ): Promise<SuccessResponseDto> {
    return this.workbookVersionService.createWorkbookSubVersion(
      userId,
      role,
      workbookId,
      body,
    );
  }

  @RoleBaseAccessControl(RoleCode.IMA, RoleCode.PMA)
  @Patch(':workbookSubVersionId/update-sub-version')
  @FormDataRequest()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
    },
    body: { type: UpdateWorkbookSubVersionDto, required: true },
    operation: {
      operationId: 'updateSubVersion',
      summary: 'Update sub version',
    },
  })
  updateSubVersion(
    @User('id') userId: string,
    @Param('workbookSubVersionId') workbookSubVersionId: string,
    @Body() body: UpdateWorkbookSubVersionDto,
  ): Promise<SuccessResponseDto> {
    return this.workbookVersionService.updateWorkbookSubVersion(
      userId,
      workbookSubVersionId,
      body,
    );
  }

  @Post(':workbookVersionId/submit')
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
    @Param('workbookVersionId') workbookVersionId: string,
    @Body() body: SubmitVersionDto,
  ): Promise<SuccessResponseDto> {
    return this.workbookVersionService.submitWorkbookVersion(
      role,
      workbookVersionId,
      body,
    );
  }

  @RoleBaseAccessControl(RoleCode.IMS, RoleCode.PMA, RoleCode.PMS)
  @Post('review-sub-version')
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
      isPagination: true,
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
}
