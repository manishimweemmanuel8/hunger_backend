import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonateRepository } from './donate.repository';
import { DonateDTO } from './DTO/donate.dto';

@Injectable()
export class DonateService {
  constructor(
    @InjectRepository(DonateRepository)
    private donateRepository: DonateRepository,
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

  async edit(donateDTO: DonateDTO, id, campaign): Promise<void> {
    return this.donateRepository.edit(donateDTO, id, campaign);
  }
}
