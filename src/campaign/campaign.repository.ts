import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { CampaignDTO } from './DTO/campaign.dto';

@EntityRepository(Campaign)
export class CampaignRepository extends Repository<Campaign> {
  async register(campaignDTO: CampaignDTO, user): Promise<void> {
    const { name, description, quality, quantity } = campaignDTO;
    const campaign = this.create({
      name,
      description,
      quality,
      quantity,
      user: user,
    });
    try {
      await this.save(campaign);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate campaign name
        console.log(error);
        throw new ConflictException('Campaign name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(campaignDTO: CampaignDTO, user, id): Promise<void> {
    const { name, description,quality,quantity , status} = campaignDTO;
    const campaign = this.create({
      name,
      description,
      quality,
      quantity,
      status,
      user: user,
    });
    try {
      await this.update({ id }, campaign);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate campaign name
        console.log(error);
        throw new ConflictException('campaign name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
