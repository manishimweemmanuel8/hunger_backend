import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsSignInDto;
    const user = await this.usersRepository.findOne({
      username,
      isActive: true,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const email = user.email;
      const role = user.role;
      const payload: JwtPayload = { username, email, role };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
