import { ImportWorkbookDto } from '../../../dto';
import { PropertyDto } from 'src/decorators';

export class CreateWorkbookSubVersionDto extends ImportWorkbookDto {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: '68dcd693c6ec1265c2eab360',
  })
  workbookId: string;
}
