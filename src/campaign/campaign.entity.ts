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
import { Donate } from '../donate/donate.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column('text')
  description: string;
  @Column({ default: 0 })
  quantity: number;

  @Column()
  quality: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  image: string;
  @ManyToOne(() => User, (user) => user.abouts)
  user: User;

  @OneToMany(() => Donate, (donate) => donate.campaign)
  donates: Donate[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
