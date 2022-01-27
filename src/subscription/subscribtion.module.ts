import { Module } from '@nestjs/common';
import { SubscribtionService } from './subscription.service';
import { SubscribtionController } from './subscription.controller';
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
  providers: [SubscribtionService],
  controllers: [SubscribtionController],
})
export class SubscribtionModule {}
