import { ApiProperty } from '@nestjs/swagger';
import {  Program } from '../program/program.entity';
import { Combinations } from '../combination/combination.entity';
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
import { Scholorship } from 'src/scholorship/scholorship.entity';
import { Criterial } from 'src/criterial/criterial.entity';

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

  @Column({ type: 'enum', enum: Role, default: Role.STAFF })
  role: Role;





  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @OneToMany(() => Combinations, (combinations) => combinations.user)
  combinations: Combinations[];

  @OneToMany(() => Scholorship, (scholorship) => scholorship.user)
  scholorships: Scholorship[];

  @OneToMany(() => Criterial, (criterial) => criterial.user)
  criterials: Criterial[];
}
