import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CriterialService } from './criterial.service';
import { CriterialDTO } from './DTO/criterial.dto';

@Controller('criterial')
export class CriterialController {
  constructor(private criterialService: CriterialService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() criterialDTO: CriterialDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.criterialService.register(criterialDTO, user);
  }

  @Get()
  async show() {
    return await this.criterialService.show();
  }
  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.criterialService.read(id);
  }

  @Get('/scholorship/:scholorshipId')
  async showByScholorship(@Param('scholorshipId') scholorshipId: string) {
    return await this.criterialService.showByScholorship(scholorshipId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Param('id') id: string,
    @Body() criterialDTO: CriterialDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;

    return this.criterialService.edit(criterialDTO, user, id);
  }
}
