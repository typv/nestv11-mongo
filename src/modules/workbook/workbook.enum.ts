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
  ImaUpdateInputs = 'ImaUpdateInputs',
  ImsReview = 'ImsReview',
  PmaReviewAndUpdateFormulas = 'PmaReviewAndUpdateFormulas',
  PmsReviewFormulas = 'PmsReviewFormulas',
  Completed = 'Completed',
}

export enum WorkbookSubVersionType {
  UpdateInputs = 'UpdateInputs',
  UpdateFormulas = 'UpdateFormulas',
}

export enum WorkbookSubVersionTeam {
  IMA = 'IMA',
  IMS = 'IMS',
  PMA = 'PMA',
  PMS = 'PMS',
}
