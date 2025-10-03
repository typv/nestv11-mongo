import { PropertyDto } from 'src/decorators';

export class RoleListResponseDto {
  @PropertyDto()
  id: string;

  @PropertyDto()
  name: string;

  @PropertyDto()
  code: string;

  @PropertyDto()
  description: string;
}