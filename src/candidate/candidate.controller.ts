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
import { CandidateService } from './candidate.service';

@Controller('candidate')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}



  @Get()
  async show() {
    return await this.candidateService.show();
  }

  @Get(':id')
  async read( @Param('id') id: string,) {
    return await this.candidateService.read(id);
  }


}
