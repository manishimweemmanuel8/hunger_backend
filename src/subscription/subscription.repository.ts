import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SubscriptionDTO } from './DTO/subscription.dto';
import { Subscription } from './subscription.entity';

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> {
  async subscribe(subscriptionDTO: SubscriptionDTO, campaign): Promise<void> {
    const { email } = subscriptionDTO;
    const subscription = this.create({
      campaign: campaign,
      email,
    });
    try {
      console.log(subscription);
      await this.save(subscription);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        // duplicate Email
        console.log(error);
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

 

  async unsubscribe(subscriptionDTO: SubscriptionDTO, campaign): Promise<void> {
    const { email, status } = subscriptionDTO;
    const subscription = this.create({
      campaign: campaign,
      email,
      status:false,
    });
    try {
      await this.update({ email }, subscription);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        console.log(error);
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async resubscribe(subscriptionDTO: SubscriptionDTO, campaign): Promise<void> {
    const { email, status } = subscriptionDTO;
    const subscription = this.create({
      campaign: campaign,
      email,
      status:true,
    });
    try {
      await this.update({ email }, subscription);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Email
        console.log(error);
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
