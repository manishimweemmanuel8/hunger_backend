import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { elementAt } from 'rxjs';
import { MailService } from '../mail/mail.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { DonateRepository } from './donate.repository';
import { DonateDTO } from './DTO/donate.dto';

@Injectable()
export class DonateService {
  constructor(
    @InjectRepository(DonateRepository)
    private donateRepository: DonateRepository,
    private subscriptionService: SubscriptionService,
    private mailService: MailService,
  ) {}

  async register(donateDTO: DonateDTO, campaign): Promise<void> {
    return this.donateRepository.register(donateDTO, campaign);
  }

  async show() {
    return await this.donateRepository.find({ relations: ['campaign'] });
  }

  async read(id: string) {
    return await this.donateRepository.findOne({
      relations: ['campaign'],
      where: { id: id },
    });
  }

  async showCampaignDonate(campaign) {
    return await this.donateRepository.find({
      relations: ['campaign'],
      where: { campaign: campaign },
    });
  }

  async edit(donateDTO: DonateDTO, id, campaign) {
    const { received, quantity } = donateDTO;
    console.log(donateDTO);
    const donate = this.donateRepository.edit(donateDTO, id, campaign);

    const donateQuantity = await this.showCampaignDonate(campaign);

    var balance = 0;
    donateQuantity.forEach((element) => {
      console.log(element.quantity);
      balance += element.quantity;
    });

    if (received) {
      const subscriptions = await this.subscriptionService.campaignSubscription(
        campaign,
      );
      subscriptions.forEach((element) => {
        this.mailService.campaignUpdate(
          element.email,
          quantity,
          balance,
          campaign,
        );
      });
    }
    return donate;
  }
}
