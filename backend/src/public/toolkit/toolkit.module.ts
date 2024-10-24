import { Module } from '@nestjs/common';
import { ToolkitController } from './toolkit.controller';
import { ToolkitService } from './toolkit.service';
import { StorageService } from 'src/lib/storage/storage.service';
import { BookService } from '../book/book.service';
import EmailService from '../email/email.service';

@Module({
  imports: [],
  controllers: [ToolkitController],
  providers: [ToolkitService, StorageService, BookService, EmailService],
})
export class ToolkitModule {}
