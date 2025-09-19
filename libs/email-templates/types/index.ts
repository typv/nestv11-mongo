// ApprovePractitionerEmail
export interface ApprovePractitionerEmailProps {
  name: string;
  practitionerName: string;
  verifyUrl: string;
}

// ClinicCancelAppointmentPatientEmail
export interface ClinicCancelAppointmentPatientEmailProps {
  practitionerName: string;
  clinicName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  cancelReason: string;
}

// ClinicCancelAppointmentPractitionerEmail
export interface ClinicCancelAppointmentPractitionerEmailProps {
  practitionerName: string;
  clinicName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  cancelReason: string;
}

// CreateAppointmentClinicEmail
export interface CreateAppointmentClinicEmailProps {
  practitionerName: string;
  clinicName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  feeAmount: string;
  discountAmount: string;
  total: string;
  patientNote: string;
  feeSuffix: string;
  patientType: string;
  bookedBy: string;
}

// CreateAppointmentPatientEmail
export interface CreateAppointmentPatientEmailProps {
  practitionerName: string;
  clinicName?: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  feeAmount: string;
  discountAmount: string;
  total: string;
  patientNote: string;
  supportEmail: string;
  feeSuffix: string;
}

// CreateAppointmentPractitionerEmail
export interface CreateAppointmentPractitionerEmailProps {
  practitionerName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  feeAmount: string;
  discountAmount: string;
  total: string;
  patientNote: string;
  feeSuffix: string;
  patientType: string;
  bookedBy: string;
}

// DeletedProfileEmail
export interface DeletedProfileEmailProps {
  name: string;
  fullName: string;
  verifyUrl: string;
  deletedOn: string;
}

// PasswordUpdatedEmail
export interface PasswordUpdatedEmailProps {
  name: string;
}

// PatientCancelAppointmentPatientEmail
export interface PatientCancelAppointmentPatientEmailProps {
  practitionerName: string;
  clinicName?: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  cancelReason: string;
}

// PatientCancelAppointmentPractitionerEmail
export interface PatientCancelAppointmentPractitionerEmailProps {
  practitionerName: string;
  clinicName?: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  cancelReason: string;
}

// PractitionerCancelAppointmentPatientEmail
export interface PractitionerCancelAppointmentPatientEmailProps {
  practitionerName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  cancelReason: string;
}

// PractitionerCancelAppointmentPractitionerEmail
export interface PractitionerCancelAppointmentPractitionerEmailProps {
  practitionerName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  cancelReason: string;
}

// ReminderEmail
export interface ReminderEmailProps {
  verifyUrl: string;
}

// ResetYourPasswordEmail
export interface ResetYourPasswordEmailProps {
  name: string;
  resetPasswordUrl: string;
}

// ReturnedPractitionerEmail
export interface ReturnedPractitionerEmailProps {
  name: string;
  practitionerName: string;
  verifyUrl: string;
}

// UpdateAppointmentClinicEmail
export interface UpdateAppointmentClinicEmailProps {
  practitionerName: string;
  clinicName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  feeAmount: string;
  discountAmount: string;
  total: string;
  patientNote: string;
  feeSuffix: string;
  patientType: string;
  bookedBy: string;
}

// UpdateAppointmentPatientEmail
export interface UpdateAppointmentPatientEmailProps {
  practitionerName: string;
  clinicName?: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  feeAmount: string;
  discountAmount: string;
  total: string;
  patientNote: string;
  supportEmail: string;
  feeSuffix: string;
}

// UpdateAppointmentPractitionerEmail
export interface UpdateAppointmentPractitionerEmailProps {
  practitionerName: string;
  patientName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: string;
  meetingLink: string;
  channelName: string;
  locationAddress: string;
  feeAmount: string;
  discountAmount: string;
  total: string;
  patientNote: string;
  feeSuffix: string;
  patientType: string;
  bookedBy: string;
}

// VerifyEmailAddressEmail
export interface VerifyEmailAddressEmailProps {
  name: string;
  verifyUrl: string;
}

export interface UpcomingAppointmentReminderEmailProps {
  practitionerName: string;
  clinicName?: string;
  patientName: string;
  serviceName: string;
  date: string;
  time: string;
  locationType: string;
  meetingLink: string;
  locationAddress: string;
  hourTillAppointment?: number;
  appointmentDetailUrl: string;
}

export interface GoogleAccountConnectionEmailProps {
  practitionerName: string;
  googleAccountEmail: string;
}

export interface OtpSecureLoginEmailProps {
  userName: string;
  otp: string;
  expiresIn: string;
}

export interface SystemMaintainanceEmailProps {
  patientName: string;
  maintainanceStartTime: string;
  maintainanceEndTime: string;
  supportEmail: string;
}

export interface UnreadMessageNotificationEmailProps {
  practitionerName: string;
  inboxUrl: string;
}

export interface PractitionerUpcomingAppointmentReminderEmailProps {
  patientName: string;
  userName: string;
  serviceName: string;
  date: string;
  time: string;
  locationType: string;
  meetingLink: string;
  locationAddress: string;
  appointmentDetailUrl: string;
}

export interface NewBillsToReviewEmailProps {
  userName: string;
  billingPeriod: string;
  totalCommissionFee: string;
  offset: string;
  billingAmount: string;
  paymentDate: string;
  billingDetailReviewUrl: string;
}

export interface IssuedInvoicesEmailProps {
  userName: string;
  amount: string;
  billingPeriod: string;
  paymentDate: string;
  cardInfo: string;
}

export interface OverduePaymentsEmailProps {
  userName: string;
  billingPeriod: string;
  totalCommissionFee: string;
  offset: string;
  billingAmount: string;
  paymentDate: string;
  overduePaymentsReviewUrl: string;
}
