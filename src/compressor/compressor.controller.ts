import { Body, Controller, Post } from '@nestjs/common';
import { CompressorService } from './compressor.service';
import { CompressEpubDTO } from './dtos/compress-epub.dto';

@Controller('compressor')
export class CompressorController {
  constructor(private readonly compressorService: CompressorService) {}

  @Post('/compress')
  compressEpub(@Body() body: CompressEpubDTO) {
    try {
      const { inputEpubPath } = body;

      this.compressorService.compressEpub(inputEpubPath);
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }
}
