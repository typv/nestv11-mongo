import { PermissionCode, RoleCode } from 'src/common/enums';

export const rolePermissionsMapping: Record<RoleCode, PermissionCode[]> = {
  [RoleCode.Admin]: [
    PermissionCode.CreateUser,
    PermissionCode.PermissionConfiguration,
  ],
  [RoleCode.IMA]: [
    PermissionCode.UploadFileInputs,
    PermissionCode.UpdateData,
    PermissionCode.GiveComments,
    PermissionCode.ReceiveNotification,
  ],
  [RoleCode.IMS]: [
    PermissionCode.GiveComments,
    PermissionCode.Review,
    PermissionCode.ReceiveNotification,
  ],
  [RoleCode.PMA]: [
    PermissionCode.UploadFileInputs,
    PermissionCode.UpdateData,
    PermissionCode.GiveComments,
    PermissionCode.Review,
    PermissionCode.ReceiveNotification,
  ],
  [RoleCode.PMS]: [
    PermissionCode.GiveComments,
    PermissionCode.Review,
    PermissionCode.ReceiveNotification,
  ],
};