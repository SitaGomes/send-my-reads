import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { getConfigToken } from '@nestjs/config';
import { ENV } from 'src/lib/constants/ENV';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: getConfigToken(ENV.JWT_SECRET),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
