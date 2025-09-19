import { JwtTokenType, UserType } from 'src/common/enums';
import { Role } from 'src/common/enums';

export interface JwtPayload {
  id: string;
  email: string;
  jti: string;
  role?: Role;
  type: JwtTokenType;
}

export interface UserRequestPayload {
  id: string;
  jti: string;
  email: string;
  role?: Role;
  emailVerified?: boolean;
  userType?: UserType;
}
