import { AuthUser, Book } from './../../models';
import { ENDPOINTS } from '../../constants/ENDPOINTS';
// app/api/auth.api.ts
import BaseApi from './base.api';

class UserApi extends BaseApi {
  static async getBooks(token: string) {
    try {
      return await this.get<Book[]>(ENDPOINTS.GET_BOOKS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get user books: ${error.message}`);
      }
      throw new Error('Failed to get user');
    }
  }

  static async getProfile(token: string) {
    try {
      return await this.get<AuthUser>(ENDPOINTS.GET_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get user: ${error.message}`);
      }
      throw new Error('Failed to get user');
    }
  }
}

export default UserApi;
