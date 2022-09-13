import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}


  async inviteCandidateInInterview(
    email,
    scholorshipName,
    candidateName,
    emailMessage,
    date,
    time,
  ) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `Welcome to SSFAMS! `,
      template: 'inviteCandidateInInterview',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
        scholorshipName,
        candidateName,
        emailMessage,
        date,
        time,
        // campaignQuantity: campaign.quantity,
        // campaignName:campaign.name,
      },
    });
  }
}
