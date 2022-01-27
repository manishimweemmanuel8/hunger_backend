import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import {  Donate } from './donate.entity';
import {  DonateDTO } from './DTO/donate.dto';

@EntityRepository(Donate)
export class DonateRepository extends Repository<Donate> {
  async register(donateDTO: DonateDTO, campaign): Promise<void> {
    const {  description, email,names,phone,amount, quantity,location } = donateDTO;
    const donate = this.create({
      names,
      amount,
      campaign:campaign,
      email,
      phone,
      description,
      quantity,
      location,
    });
    try {
      console.log(donate);
      await this.save(donate);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        // duplicate campaign name
        console.log(error);
        throw new ConflictException('Campaign name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(donateDTO: DonateDTO,  id,campaign): Promise<void> {
    const { names, description,email,phone,amount,quantity ,location,received} = donateDTO;
    const donate = this.create({
      names,
      amount,
      campaign:campaign,
      email,
      phone,
      description,
      quantity,
      location,
      received,
    });
    try {
      await this.update({ id }, donate);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate samething
        console.log(error);
        throw new ConflictException('same thing name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
