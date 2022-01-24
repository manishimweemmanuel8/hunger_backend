import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesDTO } from './DTO/services.dto';
import { ServicesRepository } from './services.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesRepository)
    private servicesRepository: ServicesRepository,
  ) {}

  async register(servicesDTO: ServicesDTO, user): Promise<void> {
    return this.servicesRepository.register(servicesDTO, user);
  }

  async show() {
    return await this.servicesRepository.find({ relations: ['user'] });
  }

  async read(id: string) {
    return await this.servicesRepository.findOne({
      relations: ['user'],
      where: { id: id },
    });
  }

  async edit(servicesDTO: ServicesDTO, user, id): Promise<void> {
    return this.servicesRepository.edit(servicesDTO, user, id);
  }
}
