import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ToolkitService } from './toolkit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { throwErrorFactory } from 'src/lib/error/errorFactory';
import { ERROR_STATUS } from 'src/lib/constants/STATUS';
import { StorageService } from 'src/lib/storage/storage.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthUser } from 'src/lib/models';
import { BookService } from '../book/book.service';
import EmailService from '../email/email.service';
import axios from 'axios';
import { SendBookDTO } from './dtos/send-epub.dto';

@UseGuards(JwtAuthGuard)
@Controller('toolkit')
export class ToolkitController {
  constructor(
    private readonly toolkitService: ToolkitService,
    private readonly storageService: StorageService,
    private readonly bookService: BookService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: { user: AuthUser },
  ) {
    if (!file) {
      console.error('No file received');
      throwErrorFactory('File is required', ERROR_STATUS.BAD_REQUEST);
    }

    try {
      const compressedFileBuffer = await this.toolkitService.compressEpub(
        file.buffer,
      );

      const compressedFileName = `${file.originalname.split('.')[0]}_compressed.epub`;

      const uploadedBook = await this.bookService.uploadBook(
        req.user,
        compressedFileName,
      );

      const downloadUrl = await this.storageService.uploadFileAndGetUrl(
        req.user.id,
        {
          ...file,
          buffer: compressedFileBuffer,
          originalname: uploadedBook.id,
        },
      );

      await this.bookService.updateBook(uploadedBook.id, {
        ...uploadedBook,
        downloadUrl,
      });

      return {
        message: 'File compressed and uploaded',
        downloadUrl,
      };
    } catch (err) {
      console.error('Error processing file:', err);
      throwErrorFactory(
        'Error processing file',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/send-book')
  async sendBook(
    @Request() req: { user: AuthUser },
    @Body() body: SendBookDTO,
  ) {
    const { bookId, email } = body;
    try {
      const book = await this.bookService.getBook(bookId);

      if (!book || book.userId !== req.user.id) {
        throwErrorFactory('Book not found', ERROR_STATUS.NOT_FOUND);
      }

      if (!email) {
        throwErrorFactory('Email is required', ERROR_STATUS.BAD_REQUEST);
      }

      const response = await axios.get(book.downloadUrl, {
        responseType: 'arraybuffer',
      });
      const fileBuffer = Buffer.from(response.data, 'binary');

      await this.emailService.sendMailWithAttachment(
        email,
        'Your Requested Book',
        `Here's the book "${book.title}" you requested.`,
        book.title,
        fileBuffer,
      );

      return { message: 'Book sent successfully' };
    } catch (error) {
      console.error('Error sending book:', error);
      throwErrorFactory(
        'Error sending book',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
