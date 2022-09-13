import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScholorshipDTO } from './DTO/scholorship.dto';
import { ScholorshipRepository } from './scholorship.repository';

@Injectable()
export class ScholorshipService {
  constructor(
    @InjectRepository(ScholorshipRepository)
    private scholorshipRepository: ScholorshipRepository,
  ) {}

  async register(scholorshipDTO: ScholorshipDTO, user): Promise<void> {
    return this.scholorshipRepository.register(scholorshipDTO, user);
  }

  async show() {
    return await this.scholorshipRepository.find({ relations: ['user'] });
  }

  async showByActiveIntenship() {
    const status = true;
    return await this.scholorshipRepository.find({
      relations: ['user'],
      where: { status: status },
    });
  }

  async showByInactiveCampaign() {
    const status = false;
    return await this.scholorshipRepository.find({
      relations: ['user'],
      where: { status: status },
    });
  }

  async read(id: string) {
    return await this.scholorshipRepository.findOne({
      relations: ['user'],
      where: { id: id },
    });
  }

  async edit(scholorshipDTO: ScholorshipDTO, user, id): Promise<void> {
    return this.scholorshipRepository.edit(scholorshipDTO, user, id);
  }

  async last() {
    const status = true;

    return await this.scholorshipRepository.find({
      relations: ['user'],
      where: { status: status },
      order: { createdDate: 'DESC' },
      take: 1,
    });
  }

  async latest() {
    const status = true;

    return await this.scholorshipRepository.find({
      relations: ['user'],
      where: { status: status },
      order: { createdDate: 'DESC' },
      take: 2,
    });
  }
}
