import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CampaignService } from 'src/campaign/campaign.service';
import { FeedbackDTO } from './DTO/feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(
    private campaignService: CampaignService,
    private feedbackService: FeedbackService,
  ) {}

  @Post()
  async register(@Body() feedbackDTO: FeedbackDTO): Promise<void> {
    const { campaignId } = feedbackDTO;
    const campaign = await this.campaignService.read(campaignId);
    return this.feedbackService.register(feedbackDTO, campaign);
  }
  @Get()
  async show() {
    return await this.feedbackService.show();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.feedbackService.read(id);
  }

  @Get('campaign/:campaignId')
  async showCampaignFeedback(@Param('campaignId') campaignId: string) {
    const campaign = await this.campaignService.read(campaignId);

    return await this.feedbackService.showCampaignFeedback(campaign);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() feedbackDTO: FeedbackDTO) {
    const { campaignId } = feedbackDTO;
    const campaign = await this.campaignService.read(campaignId);

    return this.feedbackService.edit(feedbackDTO, id, campaign);
  }
}
