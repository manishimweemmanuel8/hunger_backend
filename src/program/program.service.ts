import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramRepository } from './program.repository';
import { ProgramDTO } from './DTO/program.dto';

@Injectable()
export class ProgramService {
    constructor(
        @InjectRepository(ProgramRepository)
        private programRepository: ProgramRepository,
      ) {}

      async register(programDTO: ProgramDTO, user): Promise<void> {
        return this.programRepository.register(programDTO, user);
      }
  
      async show() {
        return await this.programRepository.find({ relations: ['user'] });
      }
  
      async read(id: string) {
        return await this.programRepository.findOne({
          relations: ['user'],
          where: { id: id },
        });
      }
  
      async edit(programDTO: ProgramDTO, user, id): Promise<void> {
        return this.programRepository.edit(programDTO, user, id);
      }
      
  async latest() {
    return await this.programRepository.find({
      relations: ['user'],
      order: { createdDate: 'DESC' },
      take: 2,
    });
  }
}
