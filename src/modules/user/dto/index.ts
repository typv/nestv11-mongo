import { OmitType } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { Gender, RoleCode, UserType } from 'src/common/enums';
import {
  IsLettersAndSpaces,
  IsNotFutureDate,
  IsValidPhoneNumber,
  ObjectIdToIdString,
  PropertyDto,
} from 'src/decorators';
import { DeleteConstraintReasonType } from '../user.enum';

// ****************************** GetMyInformation ******************************
export class RoleResponseDto {
  @PropertyDto()
  @ObjectIdToIdString()
  id: string;

  @PropertyDto()
  code: string;

  @PropertyDto()
  name: string;

  @PropertyDto()
  permissions: string[];
}

export class GetMyInformationResponseDto {
  @ObjectIdToIdString()
  @PropertyDto()
  id: string;

  @PropertyDto()
  email: string;

  @PropertyDto()
  firstName: string;

  @PropertyDto()
  lastName: string;

  @PropertyDto()
  isActive: boolean;

  @PropertyDto()
  emailVerified: boolean;

  @PropertyDto({
    type: RoleResponseDto,
    structure: 'dto',
  })
  role: RoleResponseDto;
}

// ****************************** GetUserInformation ******************************
export class GetUserInformationResponseDto {
  @PropertyDto()
  @ObjectIdToIdString()
  id: string;

  @PropertyDto()
  email: string;

  @PropertyDto()
  userType: string;

  @PropertyDto()
  isActive: boolean;

  @PropertyDto()
  role: string;

  @PropertyDto()
  createdAt: string;
}

export class SetUserTypeBodyDto {
  @PropertyDto({
    type: UserType,
    required: true,
    structure: 'enum',
    example: 'self-employed',
  })
  type: UserType;
}

export class SetUserTypeResponseDto {
  @PropertyDto()
  success: boolean;
}

export class PatchUserEmailVerifiedResponseDto {}

// ****************************** GetUserSetupChecklist ******************************
export class GetUserSetupChecklistResponseDto {
  @PropertyDto()
  userId: number;

  @PropertyDto()
  role: string;

  @PropertyDto()
  clinicProfile: boolean;

  @PropertyDto()
  practitionerProfile: boolean;

  @PropertyDto()
  practitionerHasVerified: boolean;

  @PropertyDto()
  clinicStatus: string;

  @PropertyDto()
  practitionerStatus: string;

  @PropertyDto()
  practitionersAvailability: boolean;

  @PropertyDto()
  paymentAccount: boolean;
}

// ****************************** Update User Account ******************************
export class UpdateUserProfileBodyDto {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'Elizabeth',
  })
  @IsLettersAndSpaces()
  firstName: string;

  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'Do',
  })
  @IsLettersAndSpaces()
  lastName: string;

  @PropertyDto({
    type: Date,
    required: true,
    validated: true,
    example: '2000-03-02',
  })
  @IsNotFutureDate()
  dateOfBirth: Date;

  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: '+447123456789',
  })
  @IsValidPhoneNumber()
  phoneNumber: string;

  @PropertyDto({
    type: Gender,
    required: true,
    validated: true,
    structure: 'enum',
    example: Gender.Male,
  })
  gender: Gender;
}

export class UpdateUserProfileResponseDto extends SuccessResponseDto {}

// ****************************** Update User Avatar ******************************
export class UpdateUserAvatarResponseDto extends SuccessResponseDto {}

// ***************************** Check Delete Constraint **************************
export class getDeleteConstraintResponseDto {
  @PropertyDto()
  canDelete: boolean;

  @PropertyDto({
    type: DeleteConstraintReasonType,
    structure: 'enum',
  })
  reasonType: string;
}
