import { PropertyDto } from 'src/decorators';

export class WorkbookVersionSnapshotResponseDto {
  @PropertyDto()
  presignedURL: string;
}