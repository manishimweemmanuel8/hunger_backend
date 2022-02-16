import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class EditDTO {
  username: string;

  email: string;

  isActive?: boolean = true;
  role?: Role;
}
