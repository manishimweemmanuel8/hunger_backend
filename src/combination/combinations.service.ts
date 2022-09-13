import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CombinationsRepository } from './combination.repository';
import { CombinationsDTO } from './DTO/combination.dto';

@Injectable()
export class CombinationsService {
  constructor(
    @InjectRepository(CombinationsRepository)
    private combinationRepository: CombinationsRepository,
  ) {}

  async register(combinationDTO: CombinationsDTO, user): Promise<void> {
    return this.combinationRepository.register(combinationDTO, user);
  }

  async show() {
    return await this.combinationRepository.find({ relations: ['user'] });
  }

  async read(id: string) {
    return await this.combinationRepository.findOne({
      relations: ['user'],
      where: { id: id },
    });
  }

  async edit(combinationDTO: CombinationsDTO, user, id): Promise<void> {
    return this.combinationRepository.edit(combinationDTO, user, id);
  }

  async latest() {
    return await this.combinationRepository.find({
      relations: ['user'],
      order: { createdDate: 'DESC' },
      take: 2,
    });
  }
}
