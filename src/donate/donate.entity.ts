/* eslint-disable prettier/prettier */
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from '../campaign/campaign.entity';

@Entity()
export class Donate {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  names: string;
  @Column('text')
  description: string;
  @Column({ nullable: true, default: 0 })
  quantity: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ default: false })
  received: boolean;

  @Column()
  location: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.donates)
  campaign: Campaign;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
