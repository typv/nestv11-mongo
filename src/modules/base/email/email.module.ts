import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AbstractEmailService } from 'src/modules/base/email/abstract-email.service';
import { EmailService } from 'src/modules/base/email/email.service';
import { SesEmailService } from './ses-email.service';
import { awsSesConfiguration } from '../../../config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(awsSesConfiguration)],
  providers: [
    {
      provide: AbstractEmailService,
      useClass: SesEmailService,
    },
    EmailService,
  ],
  exports: [AbstractEmailService, EmailService],
})
export class EmailModule {}
