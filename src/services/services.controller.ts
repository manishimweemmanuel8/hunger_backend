import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicesDTO } from './DTO/services.dto';
import { ServicesService } from './services.service';

@Controller('services')
@UseGuards(AuthGuard('jwt'))

export class ServicesController {

    constructor(private servicesService: ServicesService) {}

    @Post()
    register(@Body() servicesDTO: ServicesDTO, @Request() req): Promise<void> {
      const user = req.user;
      return this.servicesService.register(servicesDTO, user);
    }
  
    @Get()
    async show() {
      return await this.servicesService.show();
    }
  
    @Get(':id')
    async read(@Param('id') id: string) {
      return await this.servicesService.read(id);
    }
  
    @Patch(':id')
    async edit(
      @Param('id') id: string,
      @Body() servicesDTO: ServicesDTO,
      @Request() req,
    ): Promise<void> {
      const user = req.user;
      return this.servicesService.edit(servicesDTO, user, id);
    }
}
