import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutRepository } from './about.repository';
import { AboutDTO } from './DTO/about.dto';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(AboutRepository)
        private aboutRepository: AboutRepository,
      ) {}

      async register(aboutDTO: AboutDTO, user): Promise<void> {
        return this.aboutRepository.register(aboutDTO, user);
      }
  
      async show() {
        return await this.aboutRepository.find({ relations: ['user'] });
      }
  
      async read(id: string) {
        return await this.aboutRepository.findOne({
          relations: ['user'],
          where: { id: id },
        });
      }
  
      async edit(aboutDTO: AboutDTO, user, id): Promise<void> {
        return this.aboutRepository.edit(aboutDTO, user, id);
      }
}
