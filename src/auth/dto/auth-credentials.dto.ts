import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'username is required' })
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString({ message: 'email is required' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @ApiProperty()
  password: string;
  @IsBoolean({ message: 'status is required', each: true })
  isActive?: boolean = true;
}
