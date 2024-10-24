import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthUser } from 'src/lib/models';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getUser(@Request() req: { user: AuthUser }) {
    return this.userService.getUser(req.user);
  }

  @Get('books')
  async getAllBooks(@Request() req: { user: AuthUser }) {
    return this.userService.getAllBooks(req.user);
  }
}
