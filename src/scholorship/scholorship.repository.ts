import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ScholorshipDTO } from './DTO/scholorship.dto';
import { Scholorship } from './scholorship.entity';

@EntityRepository(Scholorship)
export class ScholorshipRepository extends Repository<Scholorship> {
  async register(scholorshipDTO: ScholorshipDTO, user): Promise<void> {
    const { names, description,  status } = scholorshipDTO;
    const scholorship = this.create({
      names,
      description,
      status,
      user: user,
    });
    try {
      await this.save(scholorship);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate id name
        console.log(error);
        throw new ConflictException('id name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(scholorshipDTO: ScholorshipDTO, user, id): Promise<void> {
    const { names, description, status} = scholorshipDTO;
    const scholorship = this.create({
      names,
      description,
      status,
      user: user,
    });
    try {
      await this.update({ id }, scholorship);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate id
        console.log(error);
        throw new ConflictException('id already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
