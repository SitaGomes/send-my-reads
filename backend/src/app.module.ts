import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './lib/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './public/user/user.module';
import { EmailModule } from './public/email/email.module';
import { ToolkitModule } from './public/toolkit/toolkit.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ToolkitModule,
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
