import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/campaign/campaign.entity';
import { SubscriptionDTO } from './DTO/subscription.dto';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionRepository)
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async subscribe(subscriptionDTO: SubscriptionDTO, campaign): Promise<void> {
    return this.subscriptionRepository.subscribe(subscriptionDTO, campaign);
  }

  async unsubscribe(subscriptionDTO: SubscriptionDTO, campaign): Promise<void> {
    return this.subscriptionRepository.unsubscribe(subscriptionDTO, campaign);
  }

  async read(email: string) {
    return await this.subscriptionRepository.findOne({
      where: { email: email },
    });
  }

  async resubscribe(subscriptionDTO: SubscriptionDTO, campaign): Promise<void> {
    return this.subscriptionRepository.resubscribe(subscriptionDTO, campaign);
  }

  async campaignSubscription(campaign: Campaign) {
    const status = true;
    return await this.subscriptionRepository.find({
      where: { campaign: campaign, status: status },
    });
  }
}
