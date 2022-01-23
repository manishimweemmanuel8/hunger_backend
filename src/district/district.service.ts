import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictRepository } from './district.repository';
import { DistrictDTO } from './DTO/district.dto';

@Injectable() 
export class DistrictService {
  constructor(
    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,
  ) {}
  async register(districtDTO: DistrictDTO, user): Promise<void> {
    return this.districtRepository.register(districtDTO, user);
  }

  async show() {
    return await this.districtRepository.find({ relations: ['user'] });
  }

  async read(id: string) {
    return await this.districtRepository.findOne({
      relations: ['user'],
      where: { id: id },
    });
  }

  async edit(districtDTO: DistrictDTO, user,id): Promise<void> {
    return this.districtRepository.edit(districtDTO, user,id);
  }
}
