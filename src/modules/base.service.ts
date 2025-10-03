import { SuccessResponseDto } from 'src/common/dto/success-response.dto';

export class BaseService {
  protected responseSuccess(): SuccessResponseDto {
    return { success: true };
  }
}
