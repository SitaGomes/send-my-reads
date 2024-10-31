import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/request/loginDto';
import { RegisterDto } from './dtos/request/registerDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    // return this.authService.login(data);
    try {
      const result = await this.authService.login(data);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Authentication failed',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
