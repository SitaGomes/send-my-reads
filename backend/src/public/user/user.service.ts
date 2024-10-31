import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/data/models';
import { DatabaseService } from 'src/lib/database/database.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUser(user: AuthUser) {
    return this.db.user.findUnique({
      where: {
        id: user.id,
      },
    });
  }

  async getAllBooks(user: AuthUser) {
    return this.db.book.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
