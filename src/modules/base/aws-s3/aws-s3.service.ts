import { GetObjectCommand, GetObjectCommandOutput, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { s3Configuration } from 'src/config';
import { Readable } from 'stream';
import { getObjectResponse, uploadResponse } from 'src/modules/base/aws-s3/aws-s3.interface';
import slugify from 'slugify';
import { Upload } from '@aws-sdk/lib-storage';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { FileUtil } from 'src/common/utilities/file.util';
import { getSignedUrl as getAwsSignedUrl } from '@aws-sdk/s3-request-presigner';
import { APP_DEFAULTS } from 'src/common/constants';

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly region: string;
  private readonly cloudfrontUrl: string;

  constructor(
    @Inject(s3Configuration.KEY)
    private readonly s3Config: ConfigType<typeof s3Configuration>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.logger = this.logger.child({ context: AwsS3Service.name });

    this.bucket = this.s3Config.awsS3BucketName;
    this.region = this.s3Config.awsS3Region;
    this.cloudfrontUrl = this.s3Config.cloudFrontUrl;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.s3Config.awsS3AccessKeyId,
        secretAccessKey: this.s3Config.awsS3SecretAccessKey,
      },

      forcePathStyle: this.s3Config.minioEnabled ? true : undefined,
      endpoint: this.s3Config.minioEnabled ? this.s3Config.minioUrl : undefined,
    });
  }

  async getPresignedUploadUrl(
    fileName: string,
    contentType: string,
    bucketFolder?: string,
  ): Promise<{ uploadUrl: string; fileUrl: string }> {
    const fileKey = bucketFolder ? `${bucketFolder}/${fileName}` : `${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 900, // 15 minutes
    });

    const fileUrl = `${this.cloudfrontUrl}/${fileKey}`;

    return { uploadUrl, fileUrl };
  }

  async upload(
    file: Express.Multer.File,
    bucketFolder: string = null,
    contentType: string = undefined,
  ): Promise<uploadResponse> {
    const originalName = file['originalName'];
    const extension = originalName.split('.').pop()?.toLowerCase()
    const slugOptions = {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    };
    const nameWithoutExt = originalName.slice(0, -(extension.length + 1));
    const nameConverted = slugify(nameWithoutExt, slugOptions);
    const fileName = `${nameConverted}-${new Date().getTime()}`;
    const fileKey = bucketFolder ? `${bucketFolder}/${fileName}.${extension}` : `${fileName}.${extension}`;

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: fileKey,
        Body: readableStream,
        ContentType: contentType,
      },
    });
    try {
      await upload.done();

      return {
        name: nameConverted,
        extension: extension,
        fileKey: fileKey,
      };
    } catch (err) {
      this.logger.error('AwsS3Service.upload: ', err);

      throw new Error();
    }
  }

  async getObject(fileKey: string): Promise<getObjectResponse> {
    const params = {
      Bucket: this.bucket,
      Key: fileKey,
    };

    try {
      const command = new GetObjectCommand(params);
      const response: GetObjectCommandOutput = await this.s3Client.send(command);

      if (!response.Body) {
        return null;
      }

      const stream = response.Body as Readable;
      const fileBuffer = await FileUtil.streamToBuffer(stream);

      return {
        fileBuffer
      };
    } catch (error) {
      console.error(`Error retrieving object ${fileKey}:`, error);
      throw error;
    }
  }

  async generatePresignedUrl(
    fileKey: string,
    contentType: string = APP_DEFAULTS.CONTENT_TYPE_DEFAULT,
  ): Promise<string> {
    const command = new PutObjectCommand({ Bucket: this.bucket, Key: fileKey, ContentType: contentType });
    const presignedUrl = await getAwsSignedUrl(this.s3Client, command, { expiresIn: 7200 });
    return presignedUrl;
  }
}
