import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackRepository } from './feedback.repository';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackRepository]), CampaignModule],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
