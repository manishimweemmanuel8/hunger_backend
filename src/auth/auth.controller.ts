import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './DTO/signup.dto';
import { SigninDto } from './DTO/signin.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EditDTO } from './DTO/edit.dto';
import { PasswordDto } from './DTO/password.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupDto: SignupDto): Promise<void> {
    return this.authService.signUp(signupDto);
  }

  @Post('/signin')
  signIn(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinDto);
  }

  @Get()
  async show() {
    return await this.authService.show();
  }

  @Get('/countUser')
  async countUser(): Promise<number> {
    return await this.authService.countUser();
  }

  @Get('/:id')
  async read(@Param() id: string) {
    return await this.authService.read(id);
  }

  @Delete('/:id')
  async delete(@Param() id: string) {
    return await this.authService.delete(id);
  }

  @Patch('/:id')
  editUser(@Param() id: string, @Body() editDTO: EditDTO): Promise<User> {
    return this.authService.edit(editDTO, id);
  }
  @Post('/password')
  editPassword(@Body() passwordDTO: PasswordDto): Promise<void> {
    return this.authService.editPassword(passwordDTO);
  }
}
