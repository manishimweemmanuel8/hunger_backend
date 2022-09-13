/* eslint-disable prettier/prettier */
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Criterial } from 'src/criterial/criterial.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  name: string;

  @Column()
  country: string;
  @Column("text")
  description: string;

  @ManyToOne(() => User, (user) => user.programs)
  user: User;

  // @OneToMany(() => Criterial, (criterial) => criterial.program)
  // criterials: Criterial[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
