import { Module } from '@nestjs/common';
import { CompressorModule } from './compressor/compressor.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CompressorModule, EmailModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
