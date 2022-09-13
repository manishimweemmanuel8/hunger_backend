import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { SelectDTO } from './DTO/select.dto';
import { Select } from './select.entity';


@EntityRepository(Select)
export class SelectRepository extends Repository<Select> {

  async registerSelectedCandidate(scholorship_id,candidate_id,user_id): Promise<void> {

    const select = this.create({
      scholorship_id,
      candidate_id,
      interview_status:false,
      user_id,
    });
    try {
      await this.save(select);
    } catch (error) {
        throw new InternalServerErrorException();
      
    }
  }

  async edit(selectDTO: SelectDTO,  id): Promise<void> {
    const { scholorshipId,candidateId, interviewStatus,pass} = selectDTO;
    const select = this.create({
      scholorship_id:scholorshipId,
      candidate_id:candidateId,
      interview_status:interviewStatus,
      pass:pass
    });

    try {
      await this.update({ id }, select);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate samething
        console.log(error);
        throw new ConflictException('same thing name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
