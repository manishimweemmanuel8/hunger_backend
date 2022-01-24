import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import {  Contact } from './contact.entity';
import {  ContactDTO } from './DTO/contact.dto';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  async register(contactDTO: ContactDTO,user): Promise<void> {
    const { name, value } = contactDTO;
    const contact = this.create({
      name,
      value,
      user:user
    });
    try {
      await this.save(contact);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate contact name
        console.log(error);
        throw new ConflictException('Contact name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(contactDTO: ContactDTO,user,id): Promise<void> {
    const { name, value } = contactDTO;
    const contact = this.create({
      name,
      value,
      user:user
    });
    try {
      await this.update({id},contact);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate contact name
        console.log(error);
        throw new ConflictException('Contact name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
