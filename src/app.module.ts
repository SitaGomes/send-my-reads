import { Module } from '@nestjs/common';
import { CompressorModule } from './compressor/compressor.module';

@Module({
  imports: [CompressorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
