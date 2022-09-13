import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Combinations } from './combination.entity';
import { CombinationsDTO } from './DTO/combination.dto';

@EntityRepository(Combinations)
export class CombinationsRepository extends Repository<Combinations> {
  async register(combinationDTO: CombinationsDTO,user): Promise<void> {
    const { name,abbreviation, description } = combinationDTO;
    const combination = this.create({
      name,
      abbreviation,
      description,
      user:user
    });
    try {
      await this.save(combination);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate services name
        console.log(error);
        throw new ConflictException('Combination name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(combinationDTO: CombinationsDTO,user,id): Promise<void> {
    const { name, abbreviation,description } = combinationDTO;
    const combination = this.create({
      name,
      abbreviation,
      description,
      user:user
    });
    try {
      await this.update({id},combination);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate services name
        console.log(error);
        throw new ConflictException('Combination name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
