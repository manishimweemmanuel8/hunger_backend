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
import { ContactService } from './contact.service';
import { ContactDTO } from './DTO/contact.dto';

@Controller('contact')
@UseGuards(AuthGuard('jwt'))

export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  register(@Body() contactDTO: ContactDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.contactService.register(contactDTO, user);
  }

  @Get()
  async show() {
    return await this.contactService.show();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.contactService.read(id);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() contactDTO: ContactDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.contactService.edit(contactDTO, user, id);
  }
}
