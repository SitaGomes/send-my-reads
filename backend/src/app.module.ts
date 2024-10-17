import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './lib/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './public/user/user.module';
import { CompressorModule } from './public/compressor/compressor.module';
import { EmailModule } from './public/email/email.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CompressorModule, 
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
