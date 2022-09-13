import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CriterialRepository } from './criterial.repository';
import { CriterialDTO } from './DTO/criterial.dto';

@Injectable()
export class CriterialService {
  constructor(
    @InjectRepository(CriterialRepository)
    private criterialRepository: CriterialRepository,
  ) {}

  async register(criterialDTO: CriterialDTO, user): Promise<void> {
    const { scholorshipId, programId, combinationId } = criterialDTO;
    console.log(criterialDTO);
    return this.criterialRepository.register(criterialDTO, user);
  }

  async show() {
    return this.criterialRepository.find();
  }

  async read(id: string) {
    return await this.criterialRepository.findOne({
      where: { id: id },
    });
  }

  async showByScholorship(scholorshipIdd: string) {
    return await this.criterialRepository.find({
      where: { scholorship_id: scholorshipIdd },
    });
  }

  async edit(criterialDTO: CriterialDTO, user, id): Promise<void> {
    return this.criterialRepository.edit(criterialDTO, user, id);
  }
}
