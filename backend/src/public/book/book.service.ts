import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/lib/database/database.service';
import { AuthUser, Book } from 'src/lib/models';

@Injectable()
export class BookService {
  constructor(private db: DatabaseService) {}

  async uploadBook(user: AuthUser, fileName: string, url?: string) {
    return this.db.book.create({
      data: {
        title: fileName,
        userId: user.id,
        downloadUrl: url || '',
      },
    });
  }

  async updateBook(bookId: string, book: Book) {
    return this.db.book.update({
      where: { id: bookId },
      data: { ...book },
    });
  }

  async getBook(bookId: string) {
    return this.db.book.findUnique({
      where: { id: bookId },
    });
  }
}
