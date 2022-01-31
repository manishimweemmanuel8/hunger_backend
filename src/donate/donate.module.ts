import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonateRepository } from './donate.repository';
import { AuthModule } from '../auth/auth.module';
import { CampaignModule } from '../campaign/campaign.module';
import { SubscriptionModule } from 'src/subscription/subscribtion.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DonateRepository]),
    AuthModule,
    CampaignModule,
    SubscriptionModule,
    MailModule,
  ],
  providers: [DonateService],
  controllers: [DonateController],
})
export class DonateModule {}
