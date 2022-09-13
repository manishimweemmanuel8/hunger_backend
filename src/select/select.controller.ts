import { Body, Controller, Get, Param, Patch, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SelectDTO } from './DTO/select.dto';
import { SelectService } from './select.service';

@Controller('select')
export class SelectController {
  constructor(
    private selectService: SelectService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async register(@Body() selectDTO: SelectDTO, @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.selectService.register(selectDTO,user);
  }


  @Get('scholorship/:scholorship_id')
  async showScholorshipCandidate(@Param('scholorship_id') scholorship_id: string) {
    return await this.selectService.showScholorshipCandidate(scholorship_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async read( @Param('id') id: string,) {
    return await this.selectService.read(id);
  }

//   @Get('campaign/:campaignId')
//   async showCampaignFeedback(@Param('campaignId') campaignId: string) {
//     const campaign = await this.campaignService.read(campaignId);

//     return await this.feedbackService.showCampaignFeedback(campaign);
//   }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() selectDTO: SelectDTO) {
    return this.selectService.edit(selectDTO, id);
  }
}
