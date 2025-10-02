import { IsNotEmpty, IsString } from 'class-validator';
import { PropertyDto } from 'src/decorators';
import { ImportWorkbookDto } from '../../../dto';

export class CreateWorkbookSubVersionDto extends ImportWorkbookDto {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: '68dcd693c6ec1265c2eab360',
  })
  workbookId: string;

  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: '{"id": "123", "name": "John Doe"}',
  })
  @IsNotEmpty()
  @IsString()
  changeSet: string;
}
