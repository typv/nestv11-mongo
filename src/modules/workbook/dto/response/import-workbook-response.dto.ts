import { PropertyDto } from 'src/decorators';

export class ImportWorkbookResponseDto {
  @PropertyDto()
  workbookId: string;

  @PropertyDto()
  univerWorkbookId: string;
}