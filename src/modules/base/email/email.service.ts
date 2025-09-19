import { Injectable } from '@nestjs/common';
import {
  ApprovePractitionerEmail,
  ClinicCancelAppointmentPatientEmail,
  ClinicCancelAppointmentPractitionerEmail,
  CreateAppointmentClinicEmail,
  CreateAppointmentPatientEmail,
  CreateAppointmentPractitionerEmail,
  DeletedProfileEmail,
  GoogleAccountConnectionEmail,
  IssuedInvoicesEmail,
  OtpSecureLoginEmail,
  OverduePaymentsEmail,
  PasswordUpdatedEmail,
  PatientCancelAppointmentPatientEmail,
  PatientCancelAppointmentPractitionerEmail,
  PractitionerCancelAppointmentPatientEmail,
  PractitionerCancelAppointmentPractitionerEmail,
  ReminderEmail,
  renderEmail,
  ResetYourPasswordEmail,
  ReturnedPractitionerEmail,
  UnreadMessageNotificationEmail,
  UpcomingAppointmentReminderEmail,
  UpdateAppointmentClinicEmail,
  UpdateAppointmentPatientEmail,
  UpdateAppointmentPractitionerEmail,
  VerifyEmailAddressEmail,
} from '@repo/email-templates';
import NewBillsToReviewEmail from 'libs/email-templates/emails/new-bills-to-review';
import SystemMaintainanceEmail from 'libs/email-templates/emails/system-maintainance';
import { AbstractEmailService } from './abstract-email.service';
import { EMAIL_SUBJECT } from './email.constants';
import {
  AdminApprovalMailPayload,
  AdminDeleteMailPayload,
  AdminRejectMailPayload,
  AppointmentMailPayload,
  CancelledBy,
  IssuedInvoicesPayload,
  NewBillsToReviewPayload,
  OtpSecureLoginMailPayload,
  OverduePaymentsPayload,
  PasswordUpdatedMailPayload,
  RecipientType,
  ReminderMailPayload,
  ResetPasswordMailPayload,
  SuccessAccountLinkMailPayload,
  SystemMaintenanceAlertsPayload,
  UnreadMessagePayload,
  UpcomingAppointmentReminderPayload,
  VerifySignupMailPayload,
} from './email.interface';

@Injectable()
export class EmailService {
  constructor(private readonly emailService: AbstractEmailService) {}

  async verifySignupMailer(payload: VerifySignupMailPayload): Promise<void> {
    const htmlContent = await renderEmail(VerifyEmailAddressEmail, payload);

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.VERIFY_EMAIL,
      htmlContent,
    });
  }

  async forgotPasswordMailer(payload: ResetPasswordMailPayload): Promise<void> {
    const htmlContent = await renderEmail(ResetYourPasswordEmail, payload);

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.RESET_PASSWORD,
      htmlContent,
    });
  }

  async reminder(payload: ReminderMailPayload): Promise<void> {
    const htmlContent = await renderEmail(ReminderEmail, payload);

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.REMINDER,
      htmlContent,
    });
  }

  async passwordUpdatedMailer(payload: PasswordUpdatedMailPayload): Promise<void> {
    const htmlContent = await renderEmail(PasswordUpdatedEmail, payload);

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.PASSWORD_UPDATED,
      htmlContent,
    });
  }

  async adminApprovalMailer(data: AdminApprovalMailPayload): Promise<void> {
    const htmlContent = await renderEmail(ApprovePractitionerEmail, data);

    await this.emailService.sendEmail({
      to: data.email,
      subject: EMAIL_SUBJECT.ADMIN_APPROVAL,
      htmlContent,
    });
  }

  async adminRejectMailer(data: AdminRejectMailPayload): Promise<void> {
    const htmlContent = await renderEmail(ReturnedPractitionerEmail, data);

    await this.emailService.sendEmail({
      to: data.email,
      subject: EMAIL_SUBJECT.ADMIN_REJECT,
      htmlContent,
    });
  }

  async adminDeleteProfileMailer(data: AdminDeleteMailPayload): Promise<void> {
    const htmlContent = await renderEmail(DeletedProfileEmail, data);

    await this.emailService.sendEmail({
      to: data.email,
      subject: EMAIL_SUBJECT.ADMIN_DELETE_PROFILE,
      htmlContent,
    });
  }

  async sendCreateAppointmentEmail(
    payload: AppointmentMailPayload,
    recipientType: RecipientType = 'patient',
  ): Promise<void> {
    const templateMap = {
      patient: CreateAppointmentPatientEmail,
      practitioner: CreateAppointmentPractitionerEmail,
      clinic: CreateAppointmentClinicEmail,
    };

    const htmlContent = await renderEmail(templateMap[recipientType] as any, payload);

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.NEW_APPOINTMENT_SCHEDULED,
      htmlContent,
    });
  }

  async sendUpdateAppointmentEmail(
    payload: AppointmentMailPayload,
    recipientType: RecipientType = 'patient',
  ): Promise<void> {
    const templateMap = {
      patient: UpdateAppointmentPatientEmail,
      practitioner: UpdateAppointmentPractitionerEmail,
      clinic: UpdateAppointmentClinicEmail,
    };

    const htmlContent = await renderEmail(templateMap[recipientType] as any, payload);

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.APPOINTMENT_UPDATED,
      htmlContent,
    });
  }

  async sendCancelAppointmentEmail(
    payload: AppointmentMailPayload,
    recipientType: RecipientType = 'patient',
    cancelledBy: CancelledBy = 'patient',
  ): Promise<void> {
    const templateMap = {
      patient: {
        patient: PatientCancelAppointmentPatientEmail,
        practitioner: PractitionerCancelAppointmentPatientEmail,
        clinic: ClinicCancelAppointmentPatientEmail,
      },
      practitioner: {
        patient: PatientCancelAppointmentPractitionerEmail,
        practitioner: PractitionerCancelAppointmentPractitionerEmail,
        clinic: ClinicCancelAppointmentPractitionerEmail,
      },
    } as const;

    const htmlContent = await renderEmail(
      templateMap[cancelledBy][recipientType] as any,
      payload,
    );

    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.APPOINTMENT_CANCELLED,
      htmlContent,
    });
  }

  async sendSuccessLinkAccountEmail(
    payload: SuccessAccountLinkMailPayload,
  ): Promise<void> {
    const htmlContent = await renderEmail(GoogleAccountConnectionEmail, payload);
    await this.emailService.sendEmail({
      to: payload.googleAccountEmail,
      subject: EMAIL_SUBJECT.ACCOUNT_LINKED,
      htmlContent,
    });
  }

  async sendOtpSecureLoginEmail(payload: OtpSecureLoginMailPayload): Promise<void> {
    const htmlContent = await renderEmail(OtpSecureLoginEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.OTP_FOR_SECURE_LOGIN,
      htmlContent,
    });
  }

  async sendUpcomingAppointmentReminder(
    payload: UpcomingAppointmentReminderPayload,
  ): Promise<void> {
    const htmlContent = await renderEmail(UpcomingAppointmentReminderEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.UPCOMING_APPOINTMENT_REMINDER,
      htmlContent,
    });
  }

  async sendNewBillsToReview(payload: NewBillsToReviewPayload): Promise<void> {
    const htmlContent = await renderEmail(NewBillsToReviewEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.NEW_BILLS_TO_REVIEW,
      htmlContent,
    });
  }

  async sendIssuedInvoices(payload: IssuedInvoicesPayload): Promise<void> {
    const htmlContent = await renderEmail(IssuedInvoicesEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.ISSUED_INVOICES,
      htmlContent,
    });
  }

  async sendOverduePayments(payload: OverduePaymentsPayload): Promise<void> {
    const htmlContent = await renderEmail(OverduePaymentsEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.OVERDUE_PAYMENTS,
      htmlContent,
    });
  }

  async sendUnreadMessage(payload: UnreadMessagePayload): Promise<void> {
    const htmlContent = await renderEmail(UnreadMessageNotificationEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.UNREAD_MESSAGE,
      htmlContent,
    });
  }

  async sendSystemMaintenanceAlerts(
    payload: SystemMaintenanceAlertsPayload,
  ): Promise<void> {
    const htmlContent = await renderEmail(SystemMaintainanceEmail, payload);
    await this.emailService.sendEmail({
      to: payload.email,
      subject: EMAIL_SUBJECT.SYSTEM_MAINTENANCE_ALERTS,
      htmlContent,
    });
  }
}
