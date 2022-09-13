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
import { CombinationsService } from './combinations.service';
import { CombinationsDTO } from './DTO/combination.dto';

@Controller('combination')
export class CombinationsController {
  constructor(private combionationsService: CombinationsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() combinationDTO: CombinationsDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.combionationsService.register(combinationDTO, user);
  }

  @Get()
  async show() {
    return await this.combionationsService.show();
  }

  @Get('/latest')
  async showLatest() {
    return await this.combionationsService.latest();
  }
  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.combionationsService.read(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Param('id') id: string,
    @Body() combinationDTO: CombinationsDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.combionationsService.edit(combinationDTO, user, id);
  }
}
