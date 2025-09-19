import { EmailOptions } from 'src/modules/base/email/email.interface';

export abstract class AbstractEmailService {
  abstract sendEmail(payload: EmailOptions): Promise<void>;
}
