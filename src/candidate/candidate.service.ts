import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidatesRepository } from './candindate.repository';
import { AboutDTO } from './DTO/candidate.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(CandidatesRepository)
    private candidateRepository: CandidatesRepository,
  ) {}

  async show() {
    return await this.candidateRepository.find();
  }

  async read(id) {
    return await this.candidateRepository.findOne(id);
  }
}
