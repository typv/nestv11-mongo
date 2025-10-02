export enum WorkbookApprovedStatus {
  InProgress = 'InProgress',
  Approved = 'Approved',
}

export enum WorkbookVersionStatus {
  Awaiting = 'Awaiting',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum WorkbookPermission {
  Read = 'Read',
  Write = 'Write',
  Admin = 'Admin',
}

export enum WorkbookSubVersionStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum WorkbookStage {
  IMA_UPDATE_INPUTS = 'IMA_UPDATE_INPUTS',
  IMS_REVIEW = 'IMS_REVIEW',
  PMA_REVIEW = 'PMA_REVIEW',
  PMA_UPDATE_FORMULAS = 'PMA_UPDATE_FORMULAS',
  PMS_REVIEW_FORMULAS = 'PMS_REVIEW_FORMULAS',
  COMPLETED = 'COMPLETED',
}

export enum WorkbookSubVersionType {
  UpdateInputs = 'Update Inputs',
  UpdateFormulas = 'Update Formulas',
}

export enum WorkbookSubVersionTeam {
  IMA = 'IMA',
  IMS = 'IMS',
  PMA = 'PMA',
  PMS = 'PMS',
}
