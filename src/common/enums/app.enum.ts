export enum RoleCode {
  Admin = 'Admin',
  IMA = 'IMA',
  IMS = 'IMS',
  PMA = 'PMA',
  PMS = 'PMS',
}

export enum BodyContentType {
  Json = 'application/json',
  MultipartFormData = 'multipart/form-data',
}

export enum AccountAction {
  VerifyEmail = 'verify-email',
  ResetPassword = 'reset-password',
}

export enum UserType {
  Admin = 'Admin',
  User = 'User',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum UserStrictType {
  Clinic = 'Clinic',
  SelfPractitioner = 'SelfPractitioner',
  ClinicPractitioner = 'ClinicPractitioner',
  Patient = 'Patient',
  Admin = 'Admin',
  NormalUser = 'NormalUser',
}

export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}