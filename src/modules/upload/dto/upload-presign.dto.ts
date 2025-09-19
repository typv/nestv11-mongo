import { MimeType } from 'src/common/enums';
import { PropertyDto } from 'src/decorators';

// ****************************** Upload Presign dto ******************************
export class UploadPresignBodyDto {
  @PropertyDto({
    type: String,
    required: false,
    validated: true,
    description: 'Folder path to upload the file',
  })
  uploadPath: string;

  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    description: 'The file name of the media being uploaded',
  })
  fileName: string;

  @PropertyDto({
    type: MimeType,
    required: true,
    validated: true,
    structure: 'enum',
    description: 'The content type of the file being uploaded',
  })
  contentType: MimeType;
}

export class UploadPresignResponseDto {
  @PropertyDto()
  uploadUrl: string;

  @PropertyDto()
  fileUrl: string;
}
