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
import { Select } from 'src/select/select.entity';

@Entity()
export class Candidates {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  names: string;
  @Column({ nullable: true, unique:true })
  email: string;
  @Column()
  marks:number;
  @Column()
  status:boolean;
  @Column({ nullable: false })
  combination_id: string;
  @Column({ nullable: false })
  program_id: string;

  // @OneToMany(() => Select, (select) => select.candidate)
  // selects: Select[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
