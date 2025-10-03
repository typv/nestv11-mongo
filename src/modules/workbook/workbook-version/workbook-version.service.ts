import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IWorkbookData } from '@univerjs/core';
import { plainToInstance } from 'class-transformer';
import { ClientSession, Connection, Model, Types, version } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AwsS3Service } from 'src/modules/base/aws-s3';
import { SubVersionResponseDto } from 'src/modules/workbook/workbook-version/dto/response/workbook-sub-version-response.dto';
import { WorkbookVersionSnapshotResponseDto } from 'src/modules/workbook/workbook-version/dto/response/workbook-version-snapshot-response.dto';
import { Readable } from 'stream';
import { Logger } from 'winston';
import {
  CreateWorkbookSubVersionDto,
  CreateWorkbookSubVersionResponseDto,
  ReviewWorkbookSubVersionDto,
  SubmitVersionDto,
  VersionResponseDto,
} from './dto';
import { ERROR_RESPONSE, fileExtensionConstant } from '../../../common/constants';
import { SuccessResponseDto } from '../../../common/dto/success-response.dto';
import { RoleCode } from '../../../common/enums';
import { FileUtil } from '../../../common/utilities/file.util';
import { JsonStreamUtil } from '../../../common/utilities/json-stream.util';
import { ServerException } from '../../../exceptions';
import {
  Role,
  RoleDocument,
  TeamReviewInfo,
  Workbook,
  WorkbookDocument,
  WorkbookSubVersion,
  WorkbookSubVersionDocument,
  WorkbookVersion,
  WorkbookVersionDocument,
} from '../../../models';
import { BaseService } from '../../base.service';
import { UploadService } from '../../upload';
import {
  WorkbookApprovedStatus,
  WorkbookStage,
  WorkbookSubVersionStatus,
  WorkbookSubVersionTeam,
  WorkbookSubVersionType,
  WorkbookVersionStatus,
} from '../workbook.enum';

@Injectable()
export class WorkbookVersionService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Workbook.name) private workbookModel: Model<WorkbookDocument>,
    @InjectModel(WorkbookVersion.name)
    private workbookVersionModel: Model<WorkbookVersionDocument>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(WorkbookSubVersion.name)
    private workbookSubVersionModel: Model<WorkbookSubVersionDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private readonly awsS3Service: AwsS3Service,
    private readonly uploadService: UploadService,
  ) {
    super();
    this.logger = this.logger.child({ context: WorkbookVersionService.name });
  }

  async createWorkbookSubVersion(
    userId: string,
    currentRole: RoleCode,
    body: CreateWorkbookSubVersionDto,
  ): Promise<CreateWorkbookSubVersionResponseDto> {
    const { workbookId, file, changeSet } = body;
    let workbookSubVersionType: WorkbookSubVersionType;

    const isValidExtension = FileUtil.isValidExtension(file, [
      fileExtensionConstant.JSON,
    ]);
    if (!isValidExtension) {
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('file extension'));
    }

    const [workbook, role] = await Promise.all([
      this.workbookModel.findOne({
        _id: new Types.ObjectId(workbookId),
      }),
      this.roleModel.findOne({ code: currentRole }),
    ]);
    if (!workbook) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook'));
    }
    this.validatePermissions(currentRole, workbook.currentStage);

    if (currentRole === RoleCode.IMA) {
      workbookSubVersionType = WorkbookSubVersionType.UpdateInputs;
    }
    if (currentRole === RoleCode.PMA) {
      workbookSubVersionType = WorkbookSubVersionType.UpdateFormulas;
    }

    const parsedWorkbookData = await this.extractDataFromFile(file);
    if (!parsedWorkbookData || !parsedWorkbookData.id) {
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('json'));
    }
    const { fileKey: snapshotFileKey } = await this.uploadService.uploadFile(
      file,
      `workbooks/${parsedWorkbookData.id}/snapshots`,
    );

    try {
      const newWorkbookSubVersion = await this.workbookSubVersionModel.create({
        workbook: workbook._id,
        role: role._id,
        version: version,
        changeSet: changeSet,
        updatedBy: new Types.ObjectId(userId),
        status: WorkbookSubVersionStatus.Pending,
        type: workbookSubVersionType,
        snapshotFileKey: snapshotFileKey,
        team:
          currentRole === RoleCode.IMA
            ? WorkbookSubVersionTeam.IMA
            : WorkbookSubVersionTeam.PMA,
      });

      return {
        workbookSubVersionId: newWorkbookSubVersion._id.toString(),
      };
    } catch (error: unknown) {
      this.logger.error({
        message:
          'WorkbookService.createWorkbookSubVersion: Failed to create workbook sub version',
        context: 'WorkbookService.createWorkbookSubVersion',
        error: error,
      });
      if (error instanceof ServerException) {
        throw error;
      }
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Failed to create workbook sub version',
      });
    }
  }

  async submitWorkbookVersion(
    userId: string,
    currentRole: RoleCode,
    body: SubmitVersionDto,
  ): Promise<SuccessResponseDto> {
    const { workbookId, file } = body;
    const session = await this.connection.startSession();
    session.startTransaction();

    const [currentWorkbookVersion] = <WorkbookVersionDocument[]>(
      await this.workbookVersionModel
        .aggregate([
          {
            $match: {
              workbook: new Types.ObjectId(workbookId),
            },
          },
          {
            $lookup: {
              from: 'roles',
              localField: 'role',
              foreignField: '_id',
              as: 'role',
            },
          },
          { $unwind: '$role' },
          {
            $match: {
              // PMA submit do not create version for PMS -> just submit for PMA to create main version
              'role.code': currentRole === RoleCode.PMS ? RoleCode.PMA : currentRole,
            },
          },
          {
            $lookup: {
              from: 'workbooks',
              localField: 'workbook',
              foreignField: '_id',
              as: 'workbook',
            },
          },
          { $unwind: '$workbook' },
          { $limit: 1 },
          {
            $project: {
              _id: 1,
              name: 1,
              version: 1,
              status: 1,
              isCurrentActive: 1,
              role: {
                _id: 1,
                code: 1,
              },
              workbook: {
                _id: 1,
                name: 1,
                currentStage: 1,
              },
            },
          },
        ])
        .session(session)
        .exec()
    );
    if (!currentWorkbookVersion) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook version'));
    }
    if (!currentWorkbookVersion.isCurrentActive) {
      throw new ServerException(ERROR_RESPONSE.WORKBOOK_VERSION_NOT_CURRENT_ACTIVE);
    }
    const workbook = currentWorkbookVersion.workbook as WorkbookDocument;
    this.validatePermissions(currentRole, workbook.currentStage);

    const parsedWorkbookData = await this.extractDataFromFile(file);
    if (!parsedWorkbookData || !parsedWorkbookData.id) {
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('json'));
    }
    const { fileKey: snapshotFileKey } = await this.uploadService.uploadFile(
      body.file,
      `workbooks/${parsedWorkbookData.id}/snapshots`,
    );
    try {
      if (currentRole === RoleCode.IMA) {
        await this.submitWorkbookVersionByIMA(
          userId,
          snapshotFileKey,
          currentWorkbookVersion,
          workbook,
          session,
        );
      }
      if (currentRole === RoleCode.IMS) {
        await this.submitWorkbookVersionByIMS(
          userId,
          snapshotFileKey,
          currentWorkbookVersion,
          workbook,
          session,
        );
      }
      if (currentRole === RoleCode.PMA) {
        await this.submitWorkbookVersionByPMA(
          currentWorkbookVersion,
          workbook,
          session,
          currentRole,
        );
      }
      if (currentRole === RoleCode.PMS) {
        await this.submitWorkbookVersionByPMS(
          userId,
          snapshotFileKey,
          currentWorkbookVersion,
          workbook,
          session,
        );
      }
      await session.commitTransaction();

      return this.responseSuccess();
    } catch (error: unknown) {
      await session.abortTransaction();
      this.logger.error({
        message:
          'WorkbookService.submitWorkbookVersion: Failed to submit workbook version',
        context: 'WorkbookService.submitWorkbookVersion',
        error: error,
      });
      if (error instanceof ServerException) {
        throw error;
      }
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Failed to submit workbook version',
      });
    } finally {
      await session.endSession();
    }
  }

  async reviewWorkbookSubVersion(
    userId: string,
    currentReviewRole: RoleCode,
    body: ReviewWorkbookSubVersionDto,
  ): Promise<SuccessResponseDto> {
    const { workbookSubVersionId, status, comment } = body;
    let workbookSubVersionType: WorkbookSubVersionType;
    if (currentReviewRole === RoleCode.PMS) {
      workbookSubVersionType = WorkbookSubVersionType.UpdateFormulas;
    } else {
      workbookSubVersionType = WorkbookSubVersionType.UpdateInputs;
    }

    const workbookSubVersion = await this.workbookSubVersionModel
      .findOne({
        _id: new Types.ObjectId(workbookSubVersionId),
        isActive: true,
        type: workbookSubVersionType,
        [`${currentReviewRole.toLowerCase()}Review.status`]:
          WorkbookSubVersionStatus.Pending,
      })
      .select(['changeSet', 'workbook', 'team'])
      .exec();
    if (!workbookSubVersion) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook sub version'));
    }

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const reviewedAt = new Date();
      const reviewedBy = new Types.ObjectId(userId);
      const updateFields: Record<string, unknown> = {};

      if (currentReviewRole === RoleCode.IMS) {
        updateFields['imsReview'] = {
          status,
          comment,
          reviewedAt,
          reviewedBy,
        };
      }

      if (currentReviewRole === RoleCode.PMA) {
        updateFields['pmaReview'] = {
          status,
          comment,
          reviewedAt,
          reviewedBy,
        };
      }

      if (currentReviewRole === RoleCode.PMS) {
        updateFields['pmsReview'] = {
          status,
          comment,
          reviewedAt,
          reviewedBy,
        };
      }

      await this.workbookSubVersionModel.updateOne(
        { _id: new Types.ObjectId(workbookSubVersionId) },
        { $set: updateFields },
        { session },
      );
      await session.commitTransaction();

      return this.responseSuccess();
    } catch (error: unknown) {
      await session.abortTransaction();
      this.logger.error({
        message: 'WorkbookService.reviewWorkbookSubVersion: Failed to review sub-version',
        context: 'WorkbookService.reviewWorkbookSubVersion',
        error: error,
      });
      if (error instanceof ServerException) {
        throw error;
      }
      throw new ServerException({
        ...ERROR_RESPONSE.BAD_REQUEST,
        message: 'Failed to review workbook sub-version',
      });
    } finally {
      await session.endSession();
    }
  }

  private async extractDataFromFile(
    file: Express.Multer.File,
  ): Promise<Partial<IWorkbookData>> {
    const jsonStream: Readable = Readable.from(file.buffer);
    try {
      const data =
        await JsonStreamUtil.processJsonStreamSimple<IWorkbookData>(jsonStream);

      return {
        id: data?.id,
        name: data?.name,
        appVersion: data?.appVersion,
        locale: data?.locale,
        styles: data?.styles,
        sheetOrder: data?.sheetOrder,
        resources: data?.resources,
        sheets: data?.sheets,
      };
    } catch (e: unknown) {
      this.logger.error({
        message:
          'WorkbookService.createWorkbookSubVersion: Failed to process workbook data',
        context: 'WorkbookService.createWorkbookSubVersion',
        error: e,
      });
      throw new ServerException(ERROR_RESPONSE.INVALID_OBJECT('json'));
    }
  }

  private async submitWorkbookVersionByIMA(
    userId: string,
    snapshotFileKey: string,
    currentWorkbookVersion: WorkbookVersionDocument,
    workbook: WorkbookDocument,
    session: ClientSession,
  ) {
    await this.validateSubmittedWorkbookVersion(workbook, RoleCode.IMA, session);
    const imsRole = await this.roleModel.findOne({ code: RoleCode.IMS });
    await this.createNewWorkbookVersion(
      userId,
      snapshotFileKey,
      workbook,
      currentWorkbookVersion,
      imsRole,
      session,
    );

    return this.updateWorkbookStage(workbook._id, WorkbookStage.ImsReview, session);
  }

  private async submitWorkbookVersionByIMS(
    userId: string,
    snapshotFileKey: string,
    currentWorkbookVersion: WorkbookVersionDocument,
    workbook: WorkbookDocument,
    session: ClientSession,
  ) {
    let newStage: WorkbookStage;
    const rejectedWorkbookSubVersions = await this.getUnapprovedWorkbookSubVersionsByRole(
      workbook._id,
      RoleCode.IMA,
      session,
    );
    if (rejectedWorkbookSubVersions.length > 0) {
      newStage = WorkbookStage.ImaUpdateInputs;

      await this.deactivateCurrentAndReactivatePreviousWbVersion(
        currentWorkbookVersion,
        session,
      );
    } else {
      const pmaRole = await this.roleModel.findOne({ code: RoleCode.PMA });
      await this.createNewWorkbookVersion(
        userId,
        snapshotFileKey,
        workbook,
        currentWorkbookVersion,
        pmaRole,
        session,
      );

      newStage = WorkbookStage.PmaReviewAndUpdateFormulas;
    }

    return this.workbookModel.updateOne(
      {
        _id: workbook._id,
      },
      {
        $set: {
          currentStage: newStage,
        },
      },
      { session },
    );
  }

  private async submitWorkbookVersionByPMA(
    currentWorkbookVersion: WorkbookVersionDocument,
    workbook: WorkbookDocument,
    session: ClientSession,
    currentRole?: RoleCode,
  ) {
    await this.validateSubmittedWorkbookVersion(workbook, RoleCode.PMA, session);
    let newStage: WorkbookStage;
    const rejectedWorkbookSubVersions = await this.getUnapprovedWorkbookSubVersionsByRole(
      workbook._id,
      RoleCode.IMS,
      session,
    );
    if (rejectedWorkbookSubVersions.length > 0) {
      newStage = WorkbookStage.ImaUpdateInputs;

      await this.deactivateCurrentAndReactivatePreviousWbVersion(
        currentWorkbookVersion,
        session,
        currentRole,
      );
    } else {
      await this.workbookVersionModel.updateOne(
        { version: currentWorkbookVersion.version - 1, workbook: workbook._id },
        {
          $set: {
            status: WorkbookVersionStatus.Approved,
          },
        },
        { session },
      );
      if (workbook.currentStage === WorkbookStage.PmaReviewAndUpdateFormulas) {
        newStage = WorkbookStage.PmsReviewFormulas;
      }
    }

    return this.updateWorkbookStage(workbook._id, newStage, session);
  }

  private async submitWorkbookVersionByPMS(
    userId: string,
    snapshotFileKey: string,
    currentWorkbookVersion: WorkbookVersionDocument,
    workbook: WorkbookDocument,
    session: ClientSession,
  ) {
    let newStage: WorkbookStage;
    const rejectedWorkbookSubVersions = await this.getUnapprovedWorkbookSubVersionsByRole(
      workbook._id,
      RoleCode.PMA,
      session,
    );
    if (rejectedWorkbookSubVersions.length > 0) {
      newStage = WorkbookStage.PmaReviewAndUpdateFormulas;
    } else {
      const pmsRole = await this.roleModel.findOne({ code: RoleCode.PMS });
      await this.createNewWorkbookVersion(
        userId,
        snapshotFileKey,
        workbook,
        currentWorkbookVersion,
        pmsRole,
        session,
      );

      newStage = WorkbookStage.Completed;
    }

    return this.updateWorkbookStage(
      workbook._id,
      newStage,
      session,
      WorkbookApprovedStatus.Approved,
    );
  }

  private isValidStageByRole(role: RoleCode, stage: WorkbookStage): boolean {
    switch (role) {
      case RoleCode.IMA:
        return stage === WorkbookStage.ImaUpdateInputs;
      case RoleCode.IMS:
        return stage === WorkbookStage.ImsReview;
      case RoleCode.PMA:
        return stage === WorkbookStage.PmaReviewAndUpdateFormulas;
      case RoleCode.PMS:
        return stage === WorkbookStage.PmsReviewFormulas;
      default:
        return false;
    }
  }

  private validatePermissions(currentRole: RoleCode, stage: WorkbookStage): void {
    if (!this.isValidStageByRole(currentRole, stage)) {
      throw new ServerException(ERROR_RESPONSE.INVALID_STAGE);
    }
  }

  private async getUnapprovedWorkbookSubVersionsByRole(
    workbookId: Types.ObjectId,
    roleCode: RoleCode,
    session: ClientSession,
  ): Promise<WorkbookSubVersionDocument[]> {
    const reviewTeam = this.getReviewTeamFieldByRole(roleCode);

    const workbookSubVersions = <WorkbookSubVersionDocument[]>(
      await this.workbookSubVersionModel
        .aggregate([
          {
            $match: {
              workbook: workbookId,
              type:
                roleCode === RoleCode.PMA
                  ? WorkbookSubVersionType.UpdateFormulas
                  : WorkbookSubVersionType.UpdateInputs,
              [`${reviewTeam}.status`]: {
                $in: [
                  WorkbookSubVersionStatus.Pending,
                  WorkbookSubVersionStatus.Rejected,
                ],
              },
              isActive: true,
            },
          },
          {
            $project: {
              _id: 1,
              [reviewTeam]: 1,
              type: 1,
              isActive: 1,
            },
          },
        ])
        .session(session)
        .exec()
    );

    const unapprovedWorkbookSubVersions = workbookSubVersions.filter(
      (subVersion) =>
        (subVersion[reviewTeam] as TeamReviewInfo).status ===
        WorkbookSubVersionStatus.Pending,
    );
    if (unapprovedWorkbookSubVersions.length > 0) {
      throw new ServerException(ERROR_RESPONSE.UNAPPROVED_WORKBOOK_SUB_VERSIONS);
    }
    const rejectedWorkbookSubVersions = workbookSubVersions.filter(
      (subVersion) =>
        (subVersion[reviewTeam] as TeamReviewInfo).status ===
        WorkbookSubVersionStatus.Rejected,
    );

    await this.workbookSubVersionModel.updateMany(
      {
        _id: {
          $in: rejectedWorkbookSubVersions.map((subVersion) => subVersion._id),
        },
      },
      { $set: { isActive: false } },
      { session },
    );

    return rejectedWorkbookSubVersions;
  }

  private async createNewWorkbookVersion(
    userId: string,
    snapshotFileKey: string,
    workbook: WorkbookDocument,
    currentWorkbookVersion: WorkbookVersionDocument,
    role: RoleDocument,
    session: ClientSession,
  ) {
    const newVersion = currentWorkbookVersion.version + 1;
    await this.workbookVersionModel.findOneAndUpdate(
      { workbook: workbook._id, version: newVersion },
      {
        $setOnInsert: {
          name: currentWorkbookVersion.name,
          version: newVersion,
          workbook: workbook._id,
          status:
            role.code !== RoleCode.PMS
              ? WorkbookVersionStatus.Awaiting
              : WorkbookVersionStatus.Approved,
          role: role._id,
          snapshotFileKey: snapshotFileKey,
          submittedBy: new Types.ObjectId(userId),
          submittedAt: new Date(),
        },
        $set: {
          isCurrentActive: true,
        },
      },
      {
        upsert: true,
        new: true,
        session,
      },
    );

    if (role.code !== RoleCode.PMS) {
      await this.deactivateCurrentAndApprovePreviousWbVersion(
        currentWorkbookVersion,
        workbook,
        session,
      );
    } else {
      await this.workbookVersionModel.updateOne(
        {
          _id: currentWorkbookVersion._id,
        },
        {
          $set: {
            isCurrentActive: false,
            status: WorkbookVersionStatus.Approved,
          },
        },
        { session },
      );
    }
  }

  private async deactivateCurrentAndApprovePreviousWbVersion(
    currentWorkbookVersion: WorkbookVersionDocument,
    workbook: WorkbookDocument,
    session: ClientSession,
  ) {
    await this.workbookVersionModel.updateOne(
      {
        _id: currentWorkbookVersion._id,
      },
      {
        $set: {
          isCurrentActive: false,
        },
      },
      { session },
    );
    await this.workbookVersionModel.updateOne(
      { version: currentWorkbookVersion.version - 1, workbook: workbook._id },
      {
        $set: {
          status: WorkbookVersionStatus.Approved,
        },
      },
      { session },
    );
  }

  private async deactivateCurrentAndReactivatePreviousWbVersion(
    currentWorkbookVersion: WorkbookVersionDocument,
    session: ClientSession,
    currentRole?: RoleCode,
  ): Promise<void> {
    let numberOfPreviousVersion = 1;
    // If current submitted workbook version -> set current to inactive and set previous to active
    await this.workbookVersionModel.updateOne(
      {
        _id: currentWorkbookVersion._id,
      },
      {
        $set: {
          isCurrentActive: false,
        },
      },
      { session },
    );
    if (currentRole === RoleCode.PMA) {
      // PMA -> IMA workbook version
      numberOfPreviousVersion = 2;
    }
    await this.workbookVersionModel.updateOne(
      {
        version: currentWorkbookVersion.version - numberOfPreviousVersion,
      },
      {
        $set: {
          isCurrentActive: true,
          status: WorkbookVersionStatus.Rejected,
        },
      },
      { session },
    );
  }

  async versionList(userId: string, workbookId: string): Promise<VersionResponseDto[]> {
    const workbook = await this.workbookModel.findOne({
      _id: new Types.ObjectId(workbookId),
    });
    if (!workbook) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook'));
    }
    const versions = <Partial<WorkbookVersionDocument>[]>(
      await this.workbookVersionModel
        .aggregate([
          { $match: { workbook: workbook._id } },
          {
            $lookup: {
              from: 'workbook-sub-versions',
              localField: '_id',
              foreignField: 'workbookVersion',
              as: 'subVersions',
              pipeline: [
                {
                  $lookup: {
                    from: 'users',
                    localField: 'updatedBy',
                    foreignField: '_id',
                    as: 'updatedByUser',
                  },
                },
                {
                  $unwind: {
                    path: '$updatedByUser',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    id: { $toString: '$_id' },
                    version: 1,
                    status: 1,
                    rejectedReason: 1,
                    updatedBy: { $ifNull: ['$updatedByUser.email', null] },
                    updatedAt: 1,
                    createdAt: 1,
                    snapshotFileKey: 1,
                  },
                },
                { $sort: { subVersionNumber: -1 } },
              ],
            },
          },
          {
            $unwind: {
              path: '$role',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'roles',
              localField: 'role',
              foreignField: '_id',
              as: 'role',
            },
          },
          {
            $unwind: {
              path: '$role',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'submittedBy',
              foreignField: '_id',
              as: 'submittedBy',
            },
          },
          {
            $unwind: {
              path: '$submittedBy',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              id: { $toString: '$_id' },
              versionName: '$name',
              version: 1,
              status: 1,
              isCurrentActive: 1,
              createdAt: 1,
              updatedAt: 1,
              submittedBy: { $ifNull: ['$submittedBy.email', null] },
              submittedAt: 1,
              subVersions: 1,
            },
          },
          { $sort: { version: -1 } },
        ])
        .exec()
    );

    return plainToInstance(VersionResponseDto, versions, { excludeExtraneousValues: true } );
  }

  private async validateSubmittedWorkbookVersion(
    workbook: WorkbookDocument,
    submittedRole: RoleCode,
    session: ClientSession,
  ): Promise<void> {
    const workbookSubVersionCount = await this.workbookSubVersionModel
      .countDocuments({
        workbook: workbook._id,
        team: this.mappingWorkbookSubVersionTeamByRole(submittedRole),
      })
      .session(session)
      .exec();

    if (workbookSubVersionCount === 0) {
      throw new ServerException(ERROR_RESPONSE.REQUIRE_WORKBOOK_SUB_VERSIONS);
    }
  }

  async subversionDetail(subVersionId: string): Promise<SubVersionResponseDto> {
    const subVersion = await this.workbookSubVersionModel.findOne({ _id: new Types.ObjectId(subVersionId) })
      .populate('updatedBy')
      .lean()
      .exec();
    if (!subVersion) throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Sub version'));

    const updatedByEmail = subVersion.updatedBy && typeof subVersion.updatedBy === 'object'
      ? subVersion.updatedBy.email
      : null;

    return plainToInstance(SubVersionResponseDto, {
      id: subVersion._id.toString(),
      ...subVersion,
      updatedBy: updatedByEmail,
    }, { excludeExtraneousValues: true });
  }

  async getSubversionSnapshot(subVersionId: string): Promise<WorkbookVersionSnapshotResponseDto> {
    const subVersion = await this.workbookSubVersionModel.findOne({ _id: new Types.ObjectId(subVersionId) })
      .lean()
      .exec();
    if (!subVersion) throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Sub version'));

    const result = await this.awsS3Service.generatePresignedUrl(subVersion?.snapshotFileKey);
    if (!result) throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Snapshot'));

    return {
      presignedURL: result,
    };
  }

  private async updateWorkbookStage(
    workbookId: Types.ObjectId,
    stage: WorkbookStage,
    session: ClientSession,
    approvedStatus?: WorkbookApprovedStatus,
  ) {
    return this.workbookModel.updateOne(
      {
        _id: workbookId,
      },
      {
        $set: {
          currentStage: stage,
          ...(approvedStatus && { approvedStatus }),
        },
      },
      { session },
    );
  }

  private mappingWorkbookSubVersionTeamByRole(role: RoleCode): WorkbookSubVersionTeam {
    switch (role) {
      case RoleCode.IMA:
        return WorkbookSubVersionTeam.IMA;
      case RoleCode.IMS:
        return WorkbookSubVersionTeam.IMS;
      case RoleCode.PMA:
        return WorkbookSubVersionTeam.PMA;
      case RoleCode.PMS:
        return WorkbookSubVersionTeam.PMS;
      default:
        return WorkbookSubVersionTeam.IMA;
    }
  }

  private getReviewTeamFieldByRole(
    roleCode: RoleCode,
  ): 'imsReview' | 'pmaReview' | 'pmsReview' {
    switch (roleCode) {
      case RoleCode.IMA:
        return 'imsReview';
      case RoleCode.IMS:
        return 'pmaReview';
      case RoleCode.PMA:
        return 'pmsReview';
      default:
        return 'imsReview';
    }
  }
}
