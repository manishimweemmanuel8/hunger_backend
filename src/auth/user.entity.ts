import { ApiProperty } from '@nestjs/swagger';
import { About } from '../about/about.entity';
import { Contact } from '../contact/contact.entity';
import { District } from '../district/district.entity';
import { Services } from '../services/services.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './enum/role.enum';
import { Campaign } from '../campaign/campaign.entity';
import { Donate } from '../donate/donate.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  password: string;
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ type: 'enum', enum: Role, default: Role.DISTRICT })
  role: Role;

  @OneToMany(() => District, (district) => district.user)
  districts: District[];

  @OneToMany(() => About, (about) => about.user)
  abouts: About[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Services, (services) => services.user)
  services: Services[];

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];
}
