import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactRepository } from './contact.repository';
import { ContactDTO } from './DTO/contact.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(ContactRepository)
        private contactRepository: ContactRepository,
      ) {}

      async register(contactDTO: ContactDTO, user): Promise<void> {
        return this.contactRepository.register(contactDTO, user);
      }
  
      async show() {
        return await this.contactRepository.find({ relations: ['user'] });
      }
  
      async read(id: string) {
        return await this.contactRepository.findOne({
          relations: ['user'],
          where: { id: id },
        });
      }
  
      async edit(contactDTO: ContactDTO, user, id): Promise<void> {
        return this.contactRepository.edit(contactDTO, user, id);
      }
}
