/* eslint-disable prettier/prettier */
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from '../campaign/campaign.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  names: string;
  @Column('text')
  feedback: string;


  @Column()
  phone: string;

 

  @Column()
  location: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.donates)
  campaign: Campaign;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
