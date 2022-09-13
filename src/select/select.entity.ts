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
import { Scholorship } from 'src/scholorship/scholorship.entity';
import { Candidates } from 'src/candidate/candidate.entity';

@Entity()
export class Select {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: false })
  interview_status: boolean;

  @Column({ default: false })
  pass: boolean;

  @Column({ nullable: false })
  scholorship_id: string;
  @Column({ nullable: false })
  candidate_id: string;
  @Column({ nullable: false })
  user_id: string;
  @Column({ nullable: true })
  emailMessage: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
