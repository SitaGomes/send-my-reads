import { Module } from '@nestjs/common';
import { CompressorController } from './compressor.controller';
import { CompressorService } from './compressor.service';
import EmailService from 'src/email/email.service';

@Module({
  imports: [],
  controllers: [CompressorController],
  providers: [CompressorService, EmailService],
})
export class CompressorModule {}
