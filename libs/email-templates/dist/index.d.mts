import * as react_jsx_runtime from 'react/jsx-runtime';

interface ApprovePractitionerEmailProps {
    name: string;
    practitionerName: string;
    verifyUrl: string;
}
interface ClinicCancelAppointmentPatientEmailProps {
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
interface ClinicCancelAppointmentPractitionerEmailProps {
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
interface CreateAppointmentClinicEmailProps {
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
interface CreateAppointmentPatientEmailProps {
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
interface CreateAppointmentPractitionerEmailProps {
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
interface DeletedProfileEmailProps {
    name: string;
    fullName: string;
    verifyUrl: string;
    deletedOn: string;
}
interface PasswordUpdatedEmailProps {
    name: string;
}
interface PatientCancelAppointmentPatientEmailProps {
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
interface PatientCancelAppointmentPractitionerEmailProps {
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
interface PractitionerCancelAppointmentPatientEmailProps {
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
interface PractitionerCancelAppointmentPractitionerEmailProps {
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
interface ReminderEmailProps {
    verifyUrl: string;
}
interface ResetYourPasswordEmailProps {
    name: string;
    resetPasswordUrl: string;
}
interface ReturnedPractitionerEmailProps {
    name: string;
    practitionerName: string;
    verifyUrl: string;
}
interface UpdateAppointmentClinicEmailProps {
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
interface UpdateAppointmentPatientEmailProps {
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
interface UpdateAppointmentPractitionerEmailProps {
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
interface VerifyEmailAddressEmailProps {
    name: string;
    verifyUrl: string;
}
interface UpcomingAppointmentReminderEmailProps {
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
interface GoogleAccountConnectionEmailProps {
    practitionerName: string;
    googleAccountEmail: string;
}
interface OtpSecureLoginEmailProps {
    userName: string;
    otp: string;
    expiresIn: string;
}
interface SystemMaintainanceEmailProps {
    patientName: string;
    maintainanceStartTime: string;
    maintainanceEndTime: string;
    supportEmail: string;
}
interface UnreadMessageNotificationEmailProps {
    practitionerName: string;
    inboxUrl: string;
}
interface PractitionerUpcomingAppointmentReminderEmailProps {
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
interface NewBillsToReviewEmailProps {
    userName: string;
    billingPeriod: string;
    totalCommissionFee: string;
    offset: string;
    billingAmount: string;
    paymentDate: string;
    billingDetailReviewUrl: string;
}
interface IssuedInvoicesEmailProps {
    userName: string;
    amount: string;
    billingPeriod: string;
    paymentDate: string;
    cardInfo: string;
}
interface OverduePaymentsEmailProps {
    userName: string;
    billingPeriod: string;
    totalCommissionFee: string;
    offset: string;
    billingAmount: string;
    paymentDate: string;
    overduePaymentsReviewUrl: string;
}

declare const ResetYourPasswordEmail: ({ name, resetPasswordUrl, }: ResetYourPasswordEmailProps) => react_jsx_runtime.JSX.Element;

declare const VerifyEmailAddressEmail: ({ name, verifyUrl, }: VerifyEmailAddressEmailProps) => react_jsx_runtime.JSX.Element;

declare const ReminderEmail: ({ verifyUrl, }: ReminderEmailProps) => react_jsx_runtime.JSX.Element;

declare const PasswordUpdatedEmail: ({ name, }: PasswordUpdatedEmailProps) => react_jsx_runtime.JSX.Element;

declare const ApprovePractitionerEmail: ({ name, practitionerName, verifyUrl, }: ApprovePractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const ReturnedPractitionerEmail: ({ name, practitionerName, verifyUrl, }: ReturnedPractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const DeletedProfileEmail: ({ name, fullName, verifyUrl, deletedOn, }: DeletedProfileEmailProps) => react_jsx_runtime.JSX.Element;

declare const CreateAppointmentPatientEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, feeAmount, discountAmount, total, patientNote, supportEmail, feeSuffix, }: CreateAppointmentPatientEmailProps) => react_jsx_runtime.JSX.Element;

declare const CreateAppointmentPractitionerEmail: ({ practitionerName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, feeAmount, discountAmount, total, patientNote, feeSuffix, patientType, bookedBy, }: CreateAppointmentPractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const CreateAppointmentClinicEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, feeAmount, discountAmount, total, patientNote, feeSuffix, patientType, bookedBy, }: CreateAppointmentClinicEmailProps) => react_jsx_runtime.JSX.Element;

declare const UpdateAppointmentPatientEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, feeAmount, discountAmount, total, patientNote, supportEmail, feeSuffix, }: UpdateAppointmentPatientEmailProps) => react_jsx_runtime.JSX.Element;

declare const UpdateAppointmentPractitionerEmail: ({ practitionerName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, feeAmount, discountAmount, total, patientNote, feeSuffix, patientType, bookedBy, }: UpdateAppointmentPractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const UpdateAppointmentClinicEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, feeAmount, discountAmount, total, patientNote, feeSuffix, patientType, bookedBy, }: UpdateAppointmentClinicEmailProps) => react_jsx_runtime.JSX.Element;

declare const PatientCancelAppointmentPatientEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, cancelReason, }: PatientCancelAppointmentPatientEmailProps) => react_jsx_runtime.JSX.Element;

declare const PractitionerCancelAppointmentPatientEmail: ({ practitionerName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, cancelReason, }: PractitionerCancelAppointmentPatientEmailProps) => react_jsx_runtime.JSX.Element;

declare const ClinicCancelAppointmentPatientEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, cancelReason, }: ClinicCancelAppointmentPatientEmailProps) => react_jsx_runtime.JSX.Element;

declare const PatientCancelAppointmentPractitionerEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, cancelReason, }: PatientCancelAppointmentPractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const PractitionerCancelAppointmentPractitionerEmail: ({ practitionerName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, cancelReason, }: PractitionerCancelAppointmentPractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const ClinicCancelAppointmentPractitionerEmail: ({ practitionerName, clinicName, patientName, serviceName, appointmentDate, appointmentTime, locationType, meetingLink, channelName, locationAddress, cancelReason, }: ClinicCancelAppointmentPractitionerEmailProps) => react_jsx_runtime.JSX.Element;

declare const OtpSecureLoginEmail: ({ userName, otp, expiresIn, }: OtpSecureLoginEmailProps) => react_jsx_runtime.JSX.Element;

declare const UpcomingAppointmentReminderEmail: ({ practitionerName, clinicName, patientName, serviceName, locationType, meetingLink, locationAddress, hourTillAppointment, date, time, appointmentDetailUrl, }: UpcomingAppointmentReminderEmailProps) => react_jsx_runtime.JSX.Element;

declare const GoogleAccountConnectionEmail: ({ practitionerName, googleAccountEmail, }: GoogleAccountConnectionEmailProps) => react_jsx_runtime.JSX.Element;

declare const SystemMaintainanceEmail: ({ patientName, maintainanceStartTime, maintainanceEndTime, supportEmail, }: SystemMaintainanceEmailProps) => react_jsx_runtime.JSX.Element;

declare const PractitionerUpcomingAppointmentReminderEmail: ({ patientName, userName, serviceName, date, time, meetingLink, locationAddress, locationType, appointmentDetailUrl, }: PractitionerUpcomingAppointmentReminderEmailProps) => react_jsx_runtime.JSX.Element;

declare const OverduePaymentsEmail: ({ userName, totalCommissionFee, billingPeriod, offset, billingAmount, paymentDate, overduePaymentsReviewUrl, }: OverduePaymentsEmailProps) => react_jsx_runtime.JSX.Element;

declare const NewBillsToReviewEmail: ({ userName, billingPeriod, totalCommissionFee, offset, billingAmount, paymentDate, billingDetailReviewUrl, }: NewBillsToReviewEmailProps) => react_jsx_runtime.JSX.Element;

declare const IssuedInvoicesEmail: ({ userName, amount, billingPeriod, paymentDate, cardInfo, }: IssuedInvoicesEmailProps) => react_jsx_runtime.JSX.Element;

declare const UnreadMessageNotificationEmail: ({ practitionerName, inboxUrl, }: UnreadMessageNotificationEmailProps) => react_jsx_runtime.JSX.Element;

/**
 * Render an email component with the given props
 * @example
 * import {renderEmail, PasswordUpdatedEmail} from '@repo/email-templates'
 * const html = await renderEmail(ResetYourPasswordEmail, { name: 'hoang' });
 * ses.sendMail({
 *  to: 'hoang@gmail.com',
 *  subject: 'Reset your password',
 *  html,
 * })
 */
declare function renderEmail<T extends Record<string, any>>(Component: React.FC<T>, props: T): Promise<string>;

export { ApprovePractitionerEmail, ClinicCancelAppointmentPatientEmail, ClinicCancelAppointmentPractitionerEmail, CreateAppointmentClinicEmail, CreateAppointmentPatientEmail, CreateAppointmentPractitionerEmail, DeletedProfileEmail, GoogleAccountConnectionEmail, IssuedInvoicesEmail, NewBillsToReviewEmail, OtpSecureLoginEmail, OverduePaymentsEmail, PasswordUpdatedEmail, PatientCancelAppointmentPatientEmail, PatientCancelAppointmentPractitionerEmail, PractitionerCancelAppointmentPatientEmail, PractitionerCancelAppointmentPractitionerEmail, PractitionerUpcomingAppointmentReminderEmail, ReminderEmail, ResetYourPasswordEmail, ReturnedPractitionerEmail, SystemMaintainanceEmail, UnreadMessageNotificationEmail, UpcomingAppointmentReminderEmail, UpdateAppointmentClinicEmail, UpdateAppointmentPatientEmail, UpdateAppointmentPractitionerEmail, VerifyEmailAddressEmail, renderEmail };
