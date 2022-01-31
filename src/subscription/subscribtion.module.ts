import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionRepository } from './subscription.repository';
import { MailModule } from '../mail/mail.module';
import { CampaignModule } from '../campaign/campaign.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionRepository]),
    MailModule,
    CampaignModule,
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  exports:[SubscriptionService],
})
export class SubscriptionModule {}
