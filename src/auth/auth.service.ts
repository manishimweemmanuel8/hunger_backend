import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './DTO/signup.dto';
import { SigninDto } from './DTO/signin.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { EditDTO } from './DTO/edit.dto';
import { PasswordDto } from './DTO/password.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<void> {
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

  async edit(editDTO: EditDTO, id): Promise<User> {
    return this.usersRepository.editUser(editDTO, id);
  }

  async editPassword(passwordDTO: PasswordDto): Promise<void> {
    return this.usersRepository.editPassword(passwordDTO);
  }

  async show() {
    return await this.usersRepository.find();
  }
  async read(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }

  async countUser(): Promise<number> {
    return await this.usersRepository.count();
  }
}
