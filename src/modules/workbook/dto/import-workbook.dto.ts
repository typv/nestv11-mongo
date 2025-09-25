import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { fileValidationConstant } from 'src/common/constants';

export class ImportWorkbookDto{
  @IsFile({
    message: 'Must be a file',
  })
  @MaxFileSize(fileValidationConstant.JSON.MAX_SIZE_MB * 1024 * 1024, {
    message: `Maximum file size of video is ${fileValidationConstant.FILE.MAX_SIZE_MB} MB`,
  })
  @HasMimeType(fileValidationConstant.JSON.ALLOW_TYPE_MIME, {
    message: `File must be of one of the types: ${fileValidationConstant.JSON.ALLOW_TYPE_MIME.toString()}`,
  })
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiProperty({ example: 'application/octet-stream' })
  @IsString()
  @IsOptional()
  contentType: string = 'application/octet-stream';
}