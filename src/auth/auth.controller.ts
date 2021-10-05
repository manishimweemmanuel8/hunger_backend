import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create Account' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  signIn(
    @Body() authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsSignInDto);
  }
}
