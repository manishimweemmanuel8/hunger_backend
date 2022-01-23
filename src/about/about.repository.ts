import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { About } from './about.entity';
import { AboutDTO } from './DTO/about.dto';

@EntityRepository(About)
export class AboutRepository extends Repository<About> {
  async register(aboutDTO: AboutDTO,user): Promise<void> {
    const { name, description } = aboutDTO;
    const about = this.create({
      name,
      description,
      user:user
    });
    try {
      await this.save(about);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate about name
        console.log(error);
        throw new ConflictException('About name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(aboutDTO: AboutDTO,user,id): Promise<void> {
    const { name, description } = aboutDTO;
    const about = this.create({
      name,
      description,
      user:user
    });
    try {
      await this.update({id},about);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate about name
        console.log(error);
        throw new ConflictException('About name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
