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
  username: string;

  @IsString({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  @IsBoolean({ message: 'status is required', each: true })
  isActive?: boolean = true;
}
