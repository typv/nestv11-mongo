import { JwtTokenType, UserType } from 'src/common/enums';
import { RoleCode } from 'src/common/enums';

export interface JwtPayload {
  id: string;
  email: string;
  jti: string;
  role?: RoleCode;
  type: JwtTokenType;
}

export interface UserRequestPayload {
  id: string;
  jti: string;
  email: string;
  role?: RoleCode;
  emailVerified?: boolean;
  userType?: UserType;
}
