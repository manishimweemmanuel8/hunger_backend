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

import { of } from 'rxjs';
// import { MailService } from '../mail/mail.service';
import { join } from 'path';
import { ScholorshipService } from './scholorship.service';
import { ScholorshipDTO } from './DTO/scholorship.dto';

@Controller('scholorship')
export class ScholorshipController {
  constructor(private scholorshipService: ScholorshipService) {}

  @Get('/last')
  async last() {
    return await this.scholorshipService.last();
  }

  @Get('/latest')
  async latest() {
    return await this.scholorshipService.latest();
  }

  @Get('/active')
  async showByActiveScholorship() {
    return await this.scholorshipService.showByActiveIntenship();
  }

  @Get('/inactive')
  async showByInactiveScholorship() {
    return await this.scholorshipService.showByInactiveCampaign();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() scholorshipDTO: ScholorshipDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.scholorshipService.register(scholorshipDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async show() {
    return await this.scholorshipService.show();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async read( @Param('id') id: string,) {
    return await this.scholorshipService.read(id);
  }



  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() scholorshipDTO: ScholorshipDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.scholorshipService.edit(scholorshipDTO, user, id);
  }

}
