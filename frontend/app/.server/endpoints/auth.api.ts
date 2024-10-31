// app/api/auth.api.ts
import type { AuthenticatorAuthUser, AuthUser } from '~/models';
import { ENDPOINTS } from '~/constants/ENDPOINTS';
import BaseApi from './base.api';

class AuthApi extends BaseApi {
  static async register(name: string, email: string, password: string) {
    try {
      return await this.post<AuthUser>(ENDPOINTS.REGISTER, {
        username: name,
        email,
        password,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw new Error('Registration failed');
    }
  }

  static async login(email: string, password: string) {
    try {
      const response = await this.post<AuthenticatorAuthUser>(ENDPOINTS.LOGIN, {
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Authentication failed: ${error.message}`);
      }
      throw new Error('Authentication failed');
    }
  }

  static async getUser() {
    try {
      return await this.get<AuthUser>(ENDPOINTS.GET_USERS);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get user: ${error.message}`);
      }
      throw new Error('Failed to get user');
    }
  }
}

export default AuthApi;
