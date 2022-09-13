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
import { Scholorship } from 'src/scholorship/scholorship.entity';
import { Program } from 'src/program/program.entity';
import { Combinations } from 'src/combination/combination.entity';

@Entity()
export class Criterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  marks_from: number;
  @Column()
  marks_to: number;
  @Column()
  scholorship_id:string;
  @Column()
  program_id:string;
  @Column()
  combination_id:string;



  // @ManyToOne(() => Scholorship, (scholorship) => scholorship.criterials)
  // scholorship: Scholorship;

  // @ManyToOne(() => Program, (program) => program.criterials)
  // program: Program;

  // @ManyToOne(() => Combinations, (combination) => combination.criterials)
  // combination: Combinations;

  @ManyToOne(() => User, (user) => user.criterials)
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
