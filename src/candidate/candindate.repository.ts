import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import {  Candidates } from './candidate.entity';
import { AboutDTO } from './DTO/candidate.dto';

@EntityRepository(Candidates)
export class CandidatesRepository extends Repository<Candidates> {
  
}
