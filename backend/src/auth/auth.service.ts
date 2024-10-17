import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/request/loginDto';
import { DatabaseService } from '../lib/database/database.service';
import { RegisterDto } from './dtos/request/registerDto';
import { LoginResDto } from './dtos/response/loginResDto';
import { AuthUser } from 'src/lib/models';
import { throwErrorFactory } from 'src/lib/error/errorFactory';
import { ERROR_STATUS } from 'src/lib/constants/STATUS';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throwErrorFactory('User not found', ERROR_STATUS.NOT_FOUND);
      }

      if (!(await bcrypt.compare(data.password, user.password))) {
        throwErrorFactory('Invalid password', ERROR_STATUS.UNAUTHORIZED);
      }

      return this.returnAuthUser({
        email: user.email,
        username: user.username,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error('Error in login method:', error);
      throwErrorFactory(
        'Database error occurred',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(data: RegisterDto) {
    try {
      const user = await this.db.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: await bcrypt.hash(data.password, 10),
        },
      });

      return this.returnAuthUser({
        email: user.email,
        username: user.username,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error('Error in register method:', error);
      throwErrorFactory(
        'Database error occurred',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(email: string) {
    const user = await this.db.user.findUnique({
      select: {
        email: true,
        username: true,
        id: true,
      },
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }

  async returnAuthUser(authUser: AuthUser) {
    return new LoginResDto({
      token: this.jwtService.sign({ ...authUser }),
      user: authUser,
    });
  }
}
