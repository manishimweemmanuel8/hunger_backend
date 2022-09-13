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
export class Combinations {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column()
  abbreviation:string
  @Column("text")
  description: string;

  @ManyToOne(() => User, (user) => user.combinations)
  user: User;
  // @OneToMany(() => Criterial, (criterial) => criterial.combination)
  // criterials: Criterial[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
