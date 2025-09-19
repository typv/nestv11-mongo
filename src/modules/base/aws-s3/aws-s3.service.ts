import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { s3Configuration } from 'src/config';

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly region: string;
  private readonly cloudfrontUrl: string;

  constructor(
    @Inject(s3Configuration.KEY)
    private readonly s3Config: ConfigType<typeof s3Configuration>,
  ) {
    this.bucket = this.s3Config.awsS3BucketName;
    this.region = this.s3Config.awsS3Region;
    this.cloudfrontUrl = this.s3Config.cloudFrontUrl;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.s3Config.awsS3AccessKeyId,
        secretAccessKey: this.s3Config.awsS3SecretAccessKey,
      },
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

  async uploadFile(
    fileName: string,
    contentType: string,
    body: Buffer,
    bucketFolder?: string,
  ): Promise<{ fileUrl: string }> {
    const fileKey = bucketFolder ? `${bucketFolder}/${fileName}` : `${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      Body: body,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    const fileUrl = `${this.cloudfrontUrl}/${fileKey}`;
    return { fileUrl };
  }
}
