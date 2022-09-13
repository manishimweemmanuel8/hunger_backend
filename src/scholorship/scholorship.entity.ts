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
import { Select } from 'src/select/select.entity';

@Entity()
export class Scholorship {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  names: string;
  @Column('text')
  description: string;
 
  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => User, (user) => user.scholorships)
  user: User;

  // @OneToMany(() => Criterial, (criterial) => criterial.scholorship)
  // criterials: Criterial[];

  // @OneToMany(() => Select, (select) => select.scholorship)
  // selects: Select[];

  

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
