import { PropertyDto } from 'src/decorators';

export class GetDocmapInformationDetailResponseDto {
  @PropertyDto()
  email: string;

  @PropertyDto()
  address: string;

  @PropertyDto()
  instagram: string;

  @PropertyDto()
  x: string;

  @PropertyDto()
  linkedin: string;

  @PropertyDto()
  website: string;

  @PropertyDto()
  adminId: number;
}
