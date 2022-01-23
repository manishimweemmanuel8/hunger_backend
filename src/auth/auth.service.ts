import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './DTO/signup.dto';
import { SigninDto } from './DTO/signin.dto';
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

  async signUp(signupDto: SignupDto): Promise<void> {
    console.log(signupDto);
    return this.usersRepository.createUser(signupDto);
  }

  async signIn(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { username, password } = signinDto;
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

  async edit(signupDTO: SignupDto,districtName): Promise<void> {
    console.log(districtName);
    return this.usersRepository.editUser(signupDTO,districtName);
  }

  async show() {
    return await this.usersRepository.find();
  }
}
