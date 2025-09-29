import { PermissionCode, RoleCode } from 'src/common/enums';

export const masterDatePermissions = [
  { code: PermissionCode.UploadFileInputs, name: 'Upload File Inputs' },
  { code: PermissionCode.UploadFileInputs, name: 'Upload File Inputs' },
  { code: PermissionCode.UpdateData, name: 'Update Datas' },
  { code: PermissionCode.GiveComments, name: 'Give comments' },
  { code: PermissionCode.Review, name: 'Approve/Reject' },
  { code: PermissionCode.ReceiveNotification, name: 'Receive Notification' },
  { code: PermissionCode.CreateUser, name: 'Create new user' },
  { code: PermissionCode.PermissionConfiguration, name: 'Permission Configuration' },
]

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