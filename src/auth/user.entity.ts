import { ApiProperty } from '@nestjs/swagger';
import { About } from 'src/about/about.entity';
import { District } from 'src/district/district.entity';
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

  @Column({ type: 'enum', enum: Role, default: Role.DISTRICT })
  role: Role;

  @OneToMany(() => District, district => district.user)
  districts: District[];

  @OneToMany(() => About, about => about.user)
  abouts: About[];
}
