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
import { ProgramService } from './program.service';
import { ProgramDTO } from './DTO/program.dto';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  register(@Body() programDTO: ProgramDTO, @Request() req): Promise<void> {
    const user = req.user;
    return this.programService.register(programDTO, user);
  }

  @Get()
  async show() {
    return await this.programService.show();
  }
  @Get('/latest')
  async showLatest() {
    return await this.programService.latest();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.programService.read(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Param('id') id: string,
    @Body() programDTO: ProgramDTO,
    @Request() req,
  ): Promise<void> {
    const user = req.user;
    return this.programService.edit(programDTO, user, id);
  }
}
