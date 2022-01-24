import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import {  Services } from './services.entity';
import {  ServicesDTO } from './DTO/services.dto';

@EntityRepository(Services)
export class ServicesRepository extends Repository<Services> {
  async register(servicesDTO: ServicesDTO,user): Promise<void> {
    const { name, description } = servicesDTO;
    const services = this.create({
      name,
      description,
      user:user
    });
    try {
      await this.save(services);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate services name
        console.log(error);
        throw new ConflictException('Services name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(servicesDTO: ServicesDTO,user,id): Promise<void> {
    const { name, description } = servicesDTO;
    const services = this.create({
      name,
      description,
      user:user
    });
    try {
      await this.update({id},services);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate services name
        console.log(error);
        throw new ConflictException('Service name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
