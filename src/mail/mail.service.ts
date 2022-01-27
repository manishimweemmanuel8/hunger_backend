import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendSubscribeEmail(email: string, campaign: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to HUNGER MS!Your Subscription done successful ',
      template: 'subscribe',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
        campaign,
      },
    });
  }

  async sendUnsubscribeEmail(email: string, campaign: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to HUNGER MS!Your Unubscription done successful ',
      template: 'unsubscribe',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
        campaign,
      },
    });
  }
}
