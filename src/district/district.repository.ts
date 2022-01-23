import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { District } from './district.entity';
import { DistrictDTO } from './DTO/district.dto';

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {
  async register(districtDTO: DistrictDTO,user): Promise<void> {
    const { name, description, status } = districtDTO;
    const district = this.create({
      name,
      description,
      status,
      user:user
    });
    try {
        console.log(district);
      await this.save(district);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate district name
        console.log(error);
        throw new ConflictException('District name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(districtDTO: DistrictDTO,user,id): Promise<void> {
    const { name, description, status } = districtDTO;
    const district = this.create({
      name,
      description,
      status,
      user:user
    });
    try {
      await this.update({id},district);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate district name
        console.log(error);
        throw new ConflictException('District name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
