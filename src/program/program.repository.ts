import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Program } from './program.entity';
import { ProgramDTO } from './DTO/program.dto';

@EntityRepository(Program)
export class ProgramRepository extends Repository<Program> {
  async register(programDTO: ProgramDTO,user): Promise<void> {
    const { name, country,description } = programDTO;
    const program = this.create({
      name,
      country,
      description,
      user:user
    });
    try {
      await this.save(program);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate program name
        console.log(error);
        throw new ConflictException('Program name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(programDTO: ProgramDTO,user,id): Promise<void> {
    const { name, country, description } = programDTO;
    const program = this.create({
      name,
      country,
      description,
      user:user
    });
    try {
      await this.update({id},program);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate Program name
        console.log(error);
        throw new ConflictException('Program name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
