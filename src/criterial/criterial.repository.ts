import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Criterial } from './criterial.entity';
import { CriterialDTO } from './DTO/criterial.dto';

@EntityRepository(Criterial)
export class CriterialRepository extends Repository<Criterial> {
  async register(criterialDTO: CriterialDTO, user): Promise<void> {
    const { marks_from, marks_to, combinationId, programId, scholorshipId } =
      criterialDTO;
    const criterial = this.create({
      marks_from,
      marks_to,
      scholorship_id: scholorshipId,
      program_id: programId,
      combination_id: combinationId,
      user: user,
    });
    console.log(criterial);
    try {
      await this.save(criterial);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async edit(criterialDTO: CriterialDTO, user, id): Promise<void> {
    const { marks_from, marks_to, scholorshipId, combinationId, programId } =
      criterialDTO;
    const criterial = this.create({
      scholorship_id: scholorshipId,
      program_id: programId,
      combination_id: combinationId,
      user: user,
      marks_from,
      marks_to,
    });
    try {
      await this.update({ id }, criterial);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
