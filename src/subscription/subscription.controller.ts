import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CampaignService } from 'src/campaign/campaign.service';
import { MailService } from 'src/mail/mail.service';
import { SubscriptionDTO } from './DTO/subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private subscriptionService: SubscriptionService,
    private mailService: MailService,
    private campaingService: CampaignService,
  ) {}

  @Post('subscribe')
  async subscribe(@Body() subscriptionDTO: SubscriptionDTO): Promise<void> {
    const { campaignId, email } = subscriptionDTO;

    const campaign = await this.campaingService.read(campaignId);
    const subscribe = await this.subscriptionService.read(email);
    if (subscribe) {
      console.log(subscribe);
      await this.mailService.sendSubscribeEmail(email, campaign.name);
      return this.subscriptionService.resubscribe(subscriptionDTO, campaign);
    }
    await this.mailService.sendSubscribeEmail(email, campaign.name);

    return this.subscriptionService.subscribe(subscriptionDTO, campaign);
  }

  @Patch('unsubscribe')
  async unsubscribe(@Body() subscriptionDTO: SubscriptionDTO): Promise<void> {
    const { campaignId, email } = subscriptionDTO;
    const campaign = await this.campaingService.read(campaignId);
    await this.mailService.sendUnsubscribeEmail(email, campaign.name);

    return this.subscriptionService.unsubscribe(subscriptionDTO, campaign);
  }
}
