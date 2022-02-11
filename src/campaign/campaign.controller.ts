import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { CampaignService } from './campaign.service';
import { CampaignDTO } from './DTO/campaign.dto';
import { saveImageToStarage } from './helper/image-storage';
import { of } from 'rxjs';
import { MailService } from '../mail/mail.service';
import { join } from 'path';

@Controller('campaign')
export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  @Get('/latest')
  async latest() {
    console.log('hello');
    return await this.campaignService.latest();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  register(@Body() campaignDTO: CampaignDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.campaignService.register(campaignDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async show() {
    return await this.campaignService.show();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('district')
  async showByDistrict(@Request() req) {
    const user = req.user;
    return await this.campaignService.showByDistrict(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('active/district')
  async showByDistrictActiveCampaign(@Request() req) {
    const user = req.user;
    return await this.campaignService.showByDistrictActiveCampaign(user);
  }

  @Get('active')
  async showByActiveCampaign() {
    return await this.campaignService.showByActiveCampaign();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('inactive/district')
  async showByDistrictInactiveCampaign(@Request() req) {
    const user = req.user;
    return await this.campaignService.showByDistrictInactiveCampaign(user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async read(@Param('id') id: string) {
    console.log(id);

    return await this.campaignService.read(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() campaignDTO: CampaignDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.campaignService.edit(campaignDTO, user, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', saveImageToStarage))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const fileName = file?.filename;
    console.log(file);
    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    const imagesFolderPath = join(process.cwd(), 'images');
    const fullImagePath = join(imagesFolderPath + '/' + file.filename);
    const data = {
      id: id,
      image: fileName,
    };
    console.log(id);
    const picture = this.campaignService.updateImage(data);
    return picture;
    return of({ error: 'File content does not match extenstion !' });
  }

  @Get('image/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res) {
    const imageName = await this.campaignService.readImage(image);
    console.log(imageName);
    console.log(res.sendFile(imageName, { root: './images' }));

    return res.sendFile(imageName, { root: './images' });
  }
}
