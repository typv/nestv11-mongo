import { render } from '@react-email/components'

export { ResetYourPasswordEmail } from './emails/reset-your-password'
export { VerifyEmailAddressEmail } from './emails/verify-email-address'
export { ReminderEmail } from './emails/reminder'
export { PasswordUpdatedEmail } from './emails/password-updated'
export { ApprovePractitionerEmail } from './emails/approved-practitioner'
export { ReturnedPractitionerEmail } from './emails/returned-practitioner'
export { DeletedProfileEmail } from './emails/deleted-profile'

// Create new appointment - Appointment Confirmed
export { CreateAppointmentPatientEmail } from './emails/create-appointment-patient'
export { CreateAppointmentPractitionerEmail } from './emails/create-appointment-practitioner'
export { CreateAppointmentClinicEmail } from './emails/create-appointment-clinic'

// Update Appointment
export { UpdateAppointmentPatientEmail } from './emails/update-appointment-patient'
export { UpdateAppointmentPractitionerEmail } from './emails/update-appointment-practitioner'
export { UpdateAppointmentClinicEmail } from './emails/update-appointment-clinic'

// Cancel Appointment BY PATIENT
export { PatientCancelAppointmentPatientEmail } from './emails/patient-cancel-appointment-patient'
export { PractitionerCancelAppointmentPatientEmail } from './emails/prac-cancel-appointment-patient'
export { ClinicCancelAppointmentPatientEmail } from './emails/clinic-cancel-appointment-patient'

// Cancel Appointment BY PRACTITIONER
export { PatientCancelAppointmentPractitionerEmail } from './emails/patient-cancel-appointment-prac'
export { PractitionerCancelAppointmentPractitionerEmail } from './emails/prac-cancel-appointment-prac'
export { ClinicCancelAppointmentPractitionerEmail } from './emails/clinic-cancel-appointment-prac'

// Otp Secure Login
export { OtpSecureLoginEmail } from './emails/otp-secure-login'

// Upcoming Appointment Reminder
export { UpcomingAppointmentReminderEmail } from './emails/upcoming-appointment-reminder'

// Google Account Connection
export { GoogleAccountConnectionEmail } from './emails/google-account-connection'

// System Maintainance
export { SystemMaintainanceEmail } from './emails/system-maintainance'

// Practitioner Upcoming Appointment Reminder
export { PractitionerUpcomingAppointmentReminderEmail } from './emails/prac-upcoming-appointment-reminder'

// Overdue Payments
export { OverduePaymentsEmail } from './emails/overdue-payments'

// New Bills To Review
export { NewBillsToReviewEmail } from './emails/new-bills-to-review'

// Issued Invoices
export { IssuedInvoicesEmail } from './emails/issued-invoices'

// Unread Message Notification
export { UnreadMessageNotificationEmail } from './emails/unread-message-noti'

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
export async function renderEmail<T extends Record<string, any>>(
	Component: React.FC<T>,
	props: T
) {
	const html = await render(<Component {...props} />)
	return html
}
