import {
  IssuedInvoicesEmailProps,
  NewBillsToReviewEmailProps,
  OverduePaymentsEmailProps,
  PatientCancelAppointmentPatientEmailProps,
  PatientCancelAppointmentPractitionerEmailProps,
  PractitionerCancelAppointmentPatientEmailProps,
  PractitionerCancelAppointmentPractitionerEmailProps,
  PractitionerUpcomingAppointmentReminderEmailProps,
  SystemMaintainanceEmailProps,
  UnreadMessageNotificationEmailProps,
  UpcomingAppointmentReminderEmailProps,
  UpdateAppointmentPatientEmailProps,
  UpdateAppointmentPractitionerEmailProps,
} from 'libs/email-templates/types';

export interface EmailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  cc?: string | string[];
  bcc?: string | string[];
  htmlContent: string;
}

export interface VerifySignupMailPayload {
  email: string;
  name: string;
  verifyUrl: string;
}

export interface ResetPasswordMailPayload {
  email: string;
  name: string;
  resetPasswordUrl: string;
}

export interface ReminderMailPayload {
  email: string;
  verifyUrl: string;
}

export interface PasswordUpdatedMailPayload
  extends Pick<VerifySignupMailPayload, 'email' | 'name'> {}

export interface AdminApprovalMailPayload {
  email: string;
  name: string;
  practitionerName: string;
  verifyUrl: string;
}

export interface AdminRejectMailPayload {
  email: string;
  name: string;
  practitionerName: string;
  comment: string;
  verifyUrl: string;
}

export interface AdminDeleteMailPayload {
  email?: string;
  name: string;
  fullName: string;
  verifyUrl: string;
  deletedOn: string;
}

export interface AppointmentMailPayload {
  email: string;
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
  supportEmail: string;
  cancelReason: string;
}

export interface SuccessAccountLinkMailPayload {
  googleAccountEmail: string;
  practitionerName: string;
}

export interface OtpSecureLoginMailPayload {
  email: string;
  userName: string;
  otp: string;
  expiresIn: string;
}

export type RecipientType = 'practitioner' | 'clinic' | 'patient';
export type CancelledBy = 'patient' | 'practitioner';

export interface UpcomingAppointmentReminderPayload
  extends UpcomingAppointmentReminderEmailProps {
  email?: string;
}

export interface PractitionerUpcomingAppointmentReminderPayload
  extends PractitionerUpcomingAppointmentReminderEmailProps {
  email?: string;
}
export interface AppointmentUpdatedPractitionerPayload
  extends UpdateAppointmentPractitionerEmailProps {
  email?: string;
}
export interface AppointmentUpdatedPatientPayload
  extends UpdateAppointmentPatientEmailProps {
  email?: string;
}
export interface PatientCancelAppointmentPatientPayload
  extends PatientCancelAppointmentPatientEmailProps {
  email?: string;
}

export interface PatientCancelAppointmentPractitionerPayload
  extends PatientCancelAppointmentPractitionerEmailProps {
  email?: string;
}

export interface PractitionerCancelAppointmentPatientPayload
  extends PractitionerCancelAppointmentPatientEmailProps {
  email?: string;
}

export interface PractitionerCancelAppointmentPractitionerPayload
  extends PractitionerCancelAppointmentPractitionerEmailProps {
  email?: string;
}
export interface NewBillsToReviewPayload extends NewBillsToReviewEmailProps {
  email: string;
}

export interface IssuedInvoicesPayload extends IssuedInvoicesEmailProps {
  email: string;
}

export interface OverduePaymentsPayload extends OverduePaymentsEmailProps {
  email: string;
}

export interface UnreadMessagePayload extends UnreadMessageNotificationEmailProps {
  email: string;
}

export interface SystemMaintenanceAlertsPayload extends SystemMaintainanceEmailProps {
  email: string;
}
