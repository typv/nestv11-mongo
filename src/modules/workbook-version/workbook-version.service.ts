import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IWorkbookData, IWorksheetData } from '@univerjs/core';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Readable } from 'stream';
import { error, Logger } from 'winston';
import {
  CreateWorkbookSubVersionDto,
  ReviewWorkbookSubVersionDto,
  SubmitVersionDto,
  UpdateWorkbookSubVersionDto, WorkbookVersionsResponseDto,
} from './dto';
import { ERROR_RESPONSE } from '../../common/constants';
import { SuccessResponseDto } from '../../common/dto/success-response.dto';
import { RoleCode } from '../../common/enums';
import {
  WorkbookStage,
  WorkbookSubVersionStatus,
  WorkbookTeam,
  WorkbookVersionStatus,
} from '../../common/enums/workbook.enum';
import { JsonStreamUtil } from '../../common/utilities/json-stream.util';
import { ServerException } from '../../exceptions';
import {
  Role,
  RoleDocument,
  Workbook,
  WorkbookDocument,
  WorkbookSubVersion,
  WorkbookSubVersionDocument,
  WorkbookVersion,
  WorkbookVersionDocument,
  Worksheet,
  WorksheetDocument,
} from '../../models';
import { BaseService } from '../base.service';
import { WorkbookApprovedStatus } from '../workbook/workbook.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WorkbookVersionService extends BaseService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(Workbook.name) private workbookModel: Model<WorkbookDocument>,
    @InjectModel(Worksheet.name) private worksheetModel: Model<WorksheetDocument>,
    @InjectModel(WorkbookVersion.name)
    private workbookVersionModel: Model<WorkbookVersionDocument>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(WorkbookSubVersion.name)
    private workbookSubVersionModel: Model<WorkbookSubVersionDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {
    super();
    this.logger = this.logger.child({ context: WorkbookVersionService.name });
  }

  async createWorkbookSubVersion(
    userId: string,
    currentRole: RoleCode,
    workbookId: string,
    body: CreateWorkbookSubVersionDto,
  ): Promise<SuccessResponseDto> {
    const [workbook, role] = await Promise.all([
      this.workbookModel.findOne({
        _id: new Types.ObjectId(workbookId),
      }),
      this.roleModel.findOne({ code: currentRole }),
    ]);
    if (!workbook) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook'));
    }
    if (!role) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Role'));
    }

    this.validatePermissions(currentRole, workbook.currentStage);
    const workbookVersion = await this.workbookVersionModel.findOne({
      workbook: workbook._id,
      role: role._id,
    });
    if (!workbookVersion) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook version'));
    }
    const version = await this.getNextWorkbookSubVersion(workbookVersion);
    const data = await this.extractDataFromFile(body.file);

    try {
      await this.workbookSubVersionModel.create({
        workbook: workbook._id,
        role: role._id,
        version: version,
        changeSet: data,
        updatedWorkbookBy: new Types.ObjectId(userId),
        updatedWorkbookAt: new Date(),
        status: WorkbookSubVersionStatus.PENDING,
        workbookVersion: workbookVersion._id,
      });

      return this.responseSuccess();
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

  async updateWorkbookSubVersion(
    userId: string,
    workbookSubVersionId: string,
    body: UpdateWorkbookSubVersionDto,
  ) {
    const workbookSubVersion = await this.workbookSubVersionModel.findOne({
      _id: new Types.ObjectId(workbookSubVersionId),
      updatedWorkbookBy: new Types.ObjectId(userId),
      status: WorkbookSubVersionStatus.REJECTED,
    });
    if (!workbookSubVersion) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook sub version'));
    }

    const parsedWorkbookData = await this.extractDataFromFile(body.file);
    try {
      await this.workbookSubVersionModel.updateOne(
        { _id: new Types.ObjectId(workbookSubVersionId) },
        {
          $set: {
            changeSet: parsedWorkbookData,
            updatedWorkbookAt: new Date(),
            status: WorkbookSubVersionStatus.PENDING,
            rejectedReason: null,
          },
        },
      );

      return this.responseSuccess();
    } catch (error: unknown) {
      this.logger.error({
        message:
          'WorkbookService.updateWorkbookSubVersion: Failed to update workbook sub version',
        context: 'WorkbookService.updateWorkbookSubVersion',
        error: error,
      });
    }
    if (error instanceof ServerException) {
      throw error;
    }
    throw new ServerException({
      ...ERROR_RESPONSE.BAD_REQUEST,
      message: 'Failed to update workbook sub version',
    });
  }

  async submitWorkbookVersion(
    currentRole: RoleCode,
    workbookVersionId: string,
    body: SubmitVersionDto,
  ): Promise<SuccessResponseDto> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const [currentWorkbookVersion] = <WorkbookVersionDocument[]>(
      await this.workbookVersionModel
        .aggregate([
          { $match: { _id: new Types.ObjectId(workbookVersionId) } },
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

    const parsedWorkbookData = await this.extractDataFromFile(body.file);
    try {
      if (currentRole === RoleCode.IMA) {
        await this.submitWorkbookVersionByIMA(
          parsedWorkbookData,
          currentWorkbookVersion,
          workbook,
          session,
        );
      }
      if (currentRole === RoleCode.IMS) {
        await this.submitWorkbookVersionByIMS(
          parsedWorkbookData,
          currentWorkbookVersion,
          workbook,
          session,
        );
      }
      if (currentRole === RoleCode.PMA) {
        await this.submitWorkbookVersionByPMA(currentWorkbookVersion, workbook, session);
      }
      if (currentRole === RoleCode.PMS) {
        await this.submitWorkbookVersionByPMS(
          parsedWorkbookData,
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
        message: 'Failed to submit workbook sub version',
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
    const { workbookSubVersionId, status, rejectedReason } = body;

    const workbookSubVersion = await this.workbookSubVersionModel
      .findOne({
        _id: new Types.ObjectId(workbookSubVersionId),
        status: WorkbookSubVersionStatus.PENDING,
      })
      .select(['changeSet', 'workbook', 'workbookVersion'])
      .populate({
        path: 'workbookVersion',
        select: ['version', 'role'],
        populate: {
          path: 'role',
          select: 'code',
        },
      })
      .exec();
    if (!workbookSubVersion) {
      throw new ServerException(ERROR_RESPONSE.OBJECT_NOT_FOUND('Workbook sub version'));
    }
    const workbookVersion = workbookSubVersion?.workbookVersion;
    const isValidReviewerRole = this.isValidReviewerRole(
      currentReviewRole,
      workbookVersion?.role?.code,
    );
    if (!isValidReviewerRole) {
      throw new ServerException(ERROR_RESPONSE.INVALID_REVIEWER_ROLE);
    }

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.workbookSubVersionModel.updateOne(
        { _id: new Types.ObjectId(workbookSubVersionId) },
        {
          $set: {
            status,
            rejectedReason,
            reviewedBy: new Types.ObjectId(userId),
            reviewedAt: new Date(),
          },
        },
        { session },
      );
      if (status === WorkbookSubVersionStatus.APPROVED) {
        if (currentReviewRole === RoleCode.IMS) {
          await this.duplicateWorkbookSubVersionToIMS(
            userId,
            workbookSubVersion,
            session,
          );
        }
      }
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
    data: Partial<IWorkbookData>,
    currentWorkbookVersion: WorkbookVersionDocument,
    workbook: WorkbookDocument,
    session: ClientSession,
  ) {
    const imsRole = await this.roleModel.findOne({ code: RoleCode.IMS });
    await this.createNewWorkbookVersion(
      data,
      workbook,
      currentWorkbookVersion,
      imsRole,
      session,
    );

    return this.workbookModel.updateOne(
      {
        _id: workbook._id,
      },
      {
        $set: {
          currentStage: WorkbookStage.IMS_REVIEW,
        },
      },
      { session },
    );
  }

  private async submitWorkbookVersionByIMS(
    data: Partial<IWorkbookData>,
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
      newStage = WorkbookStage.IMA_UPDATE_INPUTS;
    } else {
      await this.setWorkbookVersionStatusForRejectedWorkbookVersion(
        currentWorkbookVersion,
        session,
      );
      const pmaRole = await this.roleModel.findOne({ code: RoleCode.PMA });
      await this.createNewWorkbookVersion(
        data,
        workbook,
        currentWorkbookVersion,
        pmaRole,
        session,
      );

      newStage = WorkbookStage.PMA_REVIEW;
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
  ) {
    let newStage: WorkbookStage;
    const rejectedWorkbookSubVersions = await this.getUnapprovedWorkbookSubVersionsByRole(
      workbook._id,
      RoleCode.IMS,
      session,
    );
    if (rejectedWorkbookSubVersions.length > 0) {
      newStage = WorkbookStage.IMS_REVIEW;

      await this.setWorkbookVersionStatusForRejectedWorkbookVersion(
        currentWorkbookVersion,
        session,
      );
    } else {
      await this.workbookVersionModel.updateOne(
        { version: currentWorkbookVersion.version - 1, workbook: workbook._id },
        {
          $set: {
            status: WorkbookVersionStatus.APPROVED,
          },
        },
        { session },
      );
      if (workbook.currentStage === WorkbookStage.PMA_REVIEW) {
        newStage = WorkbookStage.PMA_UPDATE_FORMULAS;
      }
      if (workbook.currentStage === WorkbookStage.PMA_UPDATE_FORMULAS) {
        newStage = WorkbookStage.PMS_REVIEW_FORMULAS;
      }
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

  private async submitWorkbookVersionByPMS(
    data: Partial<IWorkbookData>,
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
      newStage = WorkbookStage.PMA_UPDATE_FORMULAS;
    } else {
      const pmsRole = await this.roleModel.findOne({ code: RoleCode.PMS });
      await this.createNewWorkbookVersion(
        data,
        workbook,
        currentWorkbookVersion,
        pmsRole,
        session,
      );

      newStage = WorkbookStage.COMPLETED;
    }

    return this.workbookModel.updateOne(
      {
        _id: workbook._id,
      },
      {
        $set: {
          currentStage: newStage,
          approvedStatus: WorkbookApprovedStatus.Approved,
        },
      },
      { session },
    );
  }

  private async duplicateWorkbookSubVersionToIMS(
    reviewerId: string,
    workbookSubVersion: WorkbookSubVersionDocument,
    session: ClientSession,
  ) {
    const [workbookVersion] = <WorkbookVersionDocument[]>await this.workbookVersionModel
      .aggregate([
        { $match: { workbook: workbookSubVersion.workbook } },
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            as: 'role',
          },
        },
        { $unwind: '$role' },
        { $match: { 'role.code': RoleCode.IMS } },
        { $limit: 1 },
        {
          $project: {
            _id: 1,
            version: 1,
          },
        },
      ])
      .session(session)
      .exec();
    const version = await this.getNextWorkbookSubVersion(workbookVersion);
    await this.workbookSubVersionModel.create(
      [
        {
          version: version,
          changeSet: workbookSubVersion.changeSet,
          status: WorkbookSubVersionStatus.PENDING,
          workbook: workbookSubVersion.workbook,
          workbookVersion: workbookVersion._id,
          updatedWorkbookBy: new Types.ObjectId(reviewerId),
          updatedWorkbookAt: new Date(),
        },
      ],
      { session },
    );
  }

  private incrementMinorVersion(current: string): string {
    const [majorStr, minorStr = '0'] = current.split('.');
    const major = Number.parseInt(majorStr || '0', 10);
    const minor = Number.parseInt(minorStr || '0', 10);
    return `${major}.${minor + 1}`;
  }

  private mappingWorkbookTeamToVersion(team: WorkbookTeam): number {
    switch (team) {
      case WorkbookTeam.IMA:
        return 1;
      case WorkbookTeam.IMS:
        return 2;
      case WorkbookTeam.PMA:
        return 3;
      case WorkbookTeam.PMS:
        return 0;
      default:
        return 1;
    }
  }

  private isValidStageByRole(role: RoleCode, stage: WorkbookStage): boolean {
    switch (role) {
      case RoleCode.IMA:
        return stage === WorkbookStage.IMA_UPDATE_INPUTS;
      case RoleCode.IMS:
        return stage === WorkbookStage.IMS_REVIEW;
      case RoleCode.PMA:
        return (
          stage === WorkbookStage.PMA_REVIEW ||
          stage === WorkbookStage.PMA_UPDATE_FORMULAS
        );
      case RoleCode.PMS:
        return stage === WorkbookStage.PMS_REVIEW_FORMULAS;
      default:
        return false;
    }
  }

  private validatePermissions(currentRole: RoleCode, stage: WorkbookStage): void {
    if (!this.isValidStageByRole(currentRole, stage)) {
      throw new ServerException(ERROR_RESPONSE.INVALID_STAGE);
    }
  }

  private isValidReviewerRole(
    currentReviewRole: RoleCode,
    workbookVersionRole: RoleCode,
  ): boolean {
    switch (workbookVersionRole) {
      case RoleCode.IMA:
        return currentReviewRole === RoleCode.IMS;
      case RoleCode.IMS:
        return currentReviewRole === RoleCode.PMA;
      case RoleCode.PMA:
        return currentReviewRole === RoleCode.PMS;
      default:
        return false;
    }
  }

  private async getNextWorkbookSubVersion(
    workbookVersion: WorkbookVersionDocument,
  ): Promise<string> {
    const latestSubVersion = await this.workbookSubVersionModel
      .findOne({
        workbookVersion: workbookVersion._id,
      })
      .sort({
        version: -1,
      })
      .exec();

    let version: string;
    if (!latestSubVersion) {
      version = `${workbookVersion.version}.1`;
    } else {
      const latestVersionRaw =
        latestSubVersion?.version ?? `${workbookVersion.version}.1`;
      const latestVersionStr = String(latestVersionRaw);
      version = this.incrementMinorVersion(latestVersionStr);
    }

    return version;
  }

  private async getUnapprovedWorkbookSubVersionsByRole(
    workbookId: Types.ObjectId,
    roleCode: RoleCode,
    session: ClientSession,
  ): Promise<WorkbookSubVersionDocument[]> {
    const workbookSubVersions = <WorkbookSubVersionDocument[]>(
      await this.workbookSubVersionModel
        .aggregate([
          {
            $match: {
              workbook: workbookId,
              status: {
                $in: [
                  WorkbookSubVersionStatus.PENDING,
                  WorkbookSubVersionStatus.REJECTED,
                ],
              },
            },
          },
          {
            $lookup: {
              from: 'workbook-versions',
              localField: 'workbookVersion',
              foreignField: '_id',
              as: 'workbookVersion',
            },
          },
          { $unwind: '$workbookVersion' },
          {
            $lookup: {
              from: 'roles',
              localField: 'workbookVersion.role',
              foreignField: '_id',
              as: 'role',
            },
          },
          { $unwind: '$role' },
          {
            $match: {
              'role.code': roleCode,
            },
          },
          {
            $project: {
              _id: 1,
              version: 1,
              status: 1,
            },
          },
        ])
        .session(session)
        .exec()
    );

    const unapprovedWorkbookSubVersions = workbookSubVersions.filter(
      (subVersion) => subVersion.status === WorkbookSubVersionStatus.PENDING,
    );
    if (unapprovedWorkbookSubVersions.length > 0) {
      throw new ServerException(ERROR_RESPONSE.UNAPPROVED_WORKBOOK_SUB_VERSIONS);
    }
    const rejectedWorkbookSubVersions = workbookSubVersions.filter(
      (subVersion) => subVersion.status === WorkbookSubVersionStatus.REJECTED,
    );

    return rejectedWorkbookSubVersions;
  }

  private async createNewWorkbookVersion(
    data: Partial<IWorkbookData>,
    workbook: WorkbookDocument,
    currentWorkbookVersion: WorkbookVersionDocument,
    role: RoleDocument,
    session: ClientSession,
  ) {
    const newVersion = currentWorkbookVersion.version + 1;
    const newWorkbookVersionResult = await this.workbookVersionModel.findOneAndUpdate(
      { workbook: workbook._id, version: newVersion },
      {
        $setOnInsert: {
          ...data,
          version: newVersion,
          workbook: workbook._id,
          status:
            role.code !== RoleCode.PMS
              ? WorkbookVersionStatus.AWAITING_APPROVAL
              : WorkbookVersionStatus.APPROVED,
          role: role._id,
        },
        $set: {
          isCurrentActive: true,
        },
      },
      {
        upsert: true,
        new: true,
        session,
        runValidators: true,
        includeResultMetadata: true,
      },
    );
    const {
      value: newWorkbookVersion,
      lastErrorObject: { updatedExisting },
    } = newWorkbookVersionResult;

    if (!updatedExisting) {
      const { sheets } = data;
      const sheetsData = Object.values(sheets);
      const worksheetsDocs = sheetsData.map((sheet: IWorksheetData) => {
        return {
          ...sheet,
          workbook: workbook._id,
          univerWorksheetId: sheet.id,
          workbookVersion: newWorkbookVersion._id,
        };
      });

      await this.worksheetModel.insertMany(worksheetsDocs, {
        session,
      });
    }

    if (role.code !== RoleCode.PMS) {
      await this.setWorkbookVersionStatusForApprovedWorkbookVersion(
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
            status: WorkbookVersionStatus.APPROVED,
          },
        },
        { session },
      );
    }
  }

  private async setWorkbookVersionStatusForApprovedWorkbookVersion(
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
          status: WorkbookVersionStatus.APPROVED,
        },
      },
      { session },
    );
  }

  private async setWorkbookVersionStatusForRejectedWorkbookVersion(
    currentWorkbookVersion: WorkbookVersionDocument,
    session: ClientSession,
  ): Promise<void> {
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
    await this.workbookVersionModel.updateOne(
      {
        version: currentWorkbookVersion.version - 1,
      },
      {
        $set: {
          isCurrentActive: true,
        },
      },
      { session },
    );
  }

  async versionList(userId: string, workbookId: string): Promise<WorkbookVersionsResponseDto[]> {
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
              from: 'roles',
              localField: 'role',
              foreignField: '_id',
              as: 'role',
            },
          },
          { $unwind: '$role' },
          {
            $lookup: {
              from: 'users',
              localField: 'submittedBy',
              foreignField: '_id',
              as: 'submittedBy',
            },
          },
          { $unwind: '$submittedBy' },
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
              submittedBy: '$submittedBy.email',
              submittedAt: 1,
            },
          },
          { $sort: { version: -1 } },
        ])
        .exec()
    );

    return plainToInstance(WorkbookVersionsResponseDto, versions, { excludeExtraneousValues: true } );
  }
}
