import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/lib/database/database.service';
import { AuthUser } from 'src/lib/models';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUser(user: AuthUser) {
    return user;
  }
}
