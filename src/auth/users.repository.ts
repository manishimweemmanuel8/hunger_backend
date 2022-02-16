import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SignupDto } from './DTO/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EditDTO } from './DTO/edit.dto';
import { PasswordDto } from './DTO/password.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(signupDto: SignupDto): Promise<void> {
    const { username, email, isActive, password, role } = signupDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      email,
      isActive,
      role,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editPassword(passwordDTO: PasswordDto): Promise<void> {
    const { password, username } = passwordDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.findOne({ where: { username: username } });
    user.password = hashedPassword;

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async editUser(editDTO: EditDTO, id): Promise<void> {
    const { username, email, isActive, role } = editDTO;

    const salt = await bcrypt.genSalt();

    const user = await this.findOne(id);

    user.username = username;
    user.email = email;
    user.role = role;
    user.isActive = isActive;

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
