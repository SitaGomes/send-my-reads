import { Module } from '@nestjs/common';
import { BookService } from './book.service';

@Module({
  controllers: [],
  providers: [BookService],
})
export class BookModule {}
