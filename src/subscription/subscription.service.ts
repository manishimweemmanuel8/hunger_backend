import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionDTO } from './DTO/subscription.dto';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscribtionService {
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
}
