import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompressorService } from './compressor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import EmailService from 'src/email/email.service';
import { CompressEpubDTO } from './dtos/compress-epub.dto';
// import { CompressEpubDTO } from './dtos/compress-epub.dto';

@Controller('compressor')
export class CompressorController {
  constructor(
    private readonly compressorService: CompressorService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CompressEpubDTO,
  ) {
    try {
      const { email } = body;
      const filePath = file.path;

      const compressedFilePath =
        await this.compressorService.compressEpub(filePath);

      await this.emailService.sendMailWithAttachment(
        email,
        'Your Compressed EPUB',
        'Please find the attached compressed EPUB file.',
        compressedFilePath,
      );

      return { message: 'File compressed and sent' };
    } catch (err) {
      console.error('Error compressing file:', err);
      return { message: 'Error compressing file' };
    }
  }
}
