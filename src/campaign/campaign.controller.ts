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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { CampaignService } from './campaign.service';
import { CampaignDTO } from './DTO/campaign.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ImageDTO } from './DTO/image.dto';
import { saveImageToStarage } from './helper/image-storage';
import { of } from 'rxjs';
import { MailService } from '../mail/mail.service';

@Controller('campaign')
@UseGuards(AuthGuard('jwt'))
export class CampaignController {
  SERVER_URL: string = 'http://localhost:3000/';

  constructor(
    private campaignService: CampaignService,
    private mailService: MailService,
  ) {}

  @Post()
  register(@Body() campaignDTO: CampaignDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.campaignService.register(campaignDTO, user);
  }

  @Get()
  async show() {
    return await this.campaignService.show();
  }

  @Get('district')
  async showByDistrict(@Request() req) {
    const user = req.user;
    return await this.campaignService.showByDistrict(user);
  }
  @Get('active/district')
  async showByDistrictActiveCampaign(@Request() req) {
    const user = req.user;
    return await this.campaignService.showByDistrictActiveCampaign(user);
  }

  @Get('inactive/district')
  async showByDistrictInactiveCampaign(@Request() req) {
    const user = req.user;
    return await this.campaignService.showByDistrictInactiveCampaign(user);
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    console.log(id);

    return await this.campaignService.read(id);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() campaignDTO: CampaignDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.campaignService.edit(campaignDTO, user, id);
  }

  // Upload image of item

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const picture = await this.campaignService.uploadImageToCloudinary(
      file,
      id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Imanage added successfully',
      payload: picture,
    };
  }

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
