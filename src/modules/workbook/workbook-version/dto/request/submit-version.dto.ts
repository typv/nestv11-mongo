import { PropertyDto } from '../../../../../decorators';
import { ImportWorkbookDto } from '../../../dto';

export class SubmitVersionDto extends ImportWorkbookDto {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: '68dcd693c6ec1265c2eab360',
  })
  workbookId: string;
}
