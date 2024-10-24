import { AuthUser } from '@kuma/models';
import { ENDPOINTS } from '../../constants/ENDPOINTS';
import BaseApi from './base.api';

class AuthApi extends BaseApi {
  static async register(name: string, email: string, password: string) {
    return this.post<AuthUser>(ENDPOINTS.REGISTER, { name, email, password });
  }

  static async login(email: string, password: string) {
    const data = (await this.post(ENDPOINTS.LOGIN, { email, password })) as {
      token: string;
      user: AuthUser;
    };
    return data;
  }

  static async getUser() {
    return this.get(ENDPOINTS.GET_USERS) as Promise<AuthUser>;
  }
}

export default AuthApi;
