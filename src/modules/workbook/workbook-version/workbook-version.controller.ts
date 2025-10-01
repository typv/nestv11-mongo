import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiProduces, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import {
  CreateWorkbookSubVersionDto,
  ReviewWorkbookSubVersionDto,
  SubmitVersionDto, SubVersionResponseDto,
  UpdateWorkbookSubVersionDto,
  VersionResponseDto
} from './dto';
import { WorkbookVersionService } from './workbook-version.service';
import { SuccessResponseDto } from '../../../common/dto/success-response.dto';
import { RoleCode } from '../../../common/enums';
import { RoleBaseAccessControl, SwaggerApiDocument, User } from '../../../decorators';
import { Response } from 'express';

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
  ): Promise<SuccessResponseDto> {
    return this.workbookVersionService.createWorkbookSubVersion(
      userId,
      role,
      body,
    );
  }

  @RoleBaseAccessControl(RoleCode.IMA, RoleCode.PMA)
  @Patch('sub-version/:workbookSubVersionId')
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
      type: Buffer,
    },
    operation: {
      operationId: 'subversionSnapshot',
      summary: 'Api getSubversionSnapshot',
      description: 'Get Subversion Snapshot',
    },
  })
  @ApiProduces('application/json')
  async getSubversionSnapshot(
    @Param('subVersionId') subVersionId: string,
    @Res() res: Response
  ): Promise<any> {
    const fileBuffer = await this.workbookVersionService.getSubversionSnapshot(subVersionId);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK).send(fileBuffer);
  }
}
