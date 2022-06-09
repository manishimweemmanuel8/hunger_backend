import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackDTO } from './DTO/feedback.dto';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(FeedbackRepository)
        private feedbackRepository: FeedbackRepository,
      ) {}
    
      async register(feedbackDTO: FeedbackDTO, campaign): Promise<void> {
        return this.feedbackRepository.register(feedbackDTO, campaign);
      }

      async show() {
        return await this.feedbackRepository.find({ relations: ['campaign'] });
      }
      async showCampaignFeedback(campaign) {
        return await this.feedbackRepository.find({
          relations: ['campaign'],
          where: { campaign: campaign },
        });
      }

      async read(id: string) {
        return await this.feedbackRepository.findOne({
          relations: ['campaign'],
          where: { id: id },
        });
      }

      async edit(feedbackDTO: FeedbackDTO, id, campaign) {
        const feedbackData = this.feedbackRepository.edit(feedbackDTO, id, campaign);
        return feedbackData;
      }
}
