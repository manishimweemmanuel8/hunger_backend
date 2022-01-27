import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CampaignService } from '../campaign/campaign.service';
import { DonateService } from './donate.service';
import { DonateDTO } from './DTO/donate.dto';

@Controller('donate')
export class DonateController {
  constructor(
    private campaignService: CampaignService,
    private donateService: DonateService,
  ) {}

  @Post()
  async register(@Body() donateDTO: DonateDTO): Promise<void> {
    const { campaignId } = donateDTO;
    const campaign = await this.campaignService.read(campaignId);
    return this.donateService.register(donateDTO, campaign);
  }

  @Get()
  async show() {
    return await this.donateService.show();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.donateService.read(id);
  }

  @Get('campaign/:campaignId')
  async showCampaignDonate(@Param('campaignId') campaignId: string) {
    const campaign = await this.campaignService.read(campaignId);

    return await this.donateService.showCampaignDonate(campaign);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() donateDTO: DonateDTO,
  ): Promise<void> {
    const { campaignId } = donateDTO;
    const campaign = await this.campaignService.read(campaignId);
    return this.donateService.edit(donateDTO, id, campaign);
  }
}
