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
import { AboutService } from './about.service';
import { AboutDTO } from './DTO/about.dto';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  register(@Body() aboutDTO: AboutDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.aboutService.register(aboutDTO, user);
  }

  @Get()
  async show() {
    return await this.aboutService.show();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.aboutService.read(id);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() aboutDTO: AboutDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.aboutService.edit(aboutDTO, user, id);
  }
}
