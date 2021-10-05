import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './enum/auth-role.enum';

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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ORGANIZER })
  role: UserRole;
}
