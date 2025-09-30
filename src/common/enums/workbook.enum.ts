export enum WorkbookPermission {
  Read = 'read',
  Write = 'write',
  Admin = 'admin',
}

export enum WorkbookSubVersionStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum WorkbookVersionStatus {
  AWAITING_APPROVAL = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum WorkbookStage {
  IMA_UPDATE_INPUTS = 'IMA_UPDATE_INPUTS',
  IMS_REVIEW = 'IMS_REVIEW',
  PMA_REVIEW = 'PMA_REVIEW',
  PMA_UPDATE_FORMULAS = 'PMA_UPDATE_FORMULAS',
  PMS_REVIEW_FORMULAS = 'PMS_REVIEW_FORMULAS',
  COMPLETED = 'COMPLETED',
}

export enum WorkbookTeam {
  IMA = 'IMA',
  IMS = 'IMS',
  PMA = 'PMA',
  PMS = 'PMS',
}
