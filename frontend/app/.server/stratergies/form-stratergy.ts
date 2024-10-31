import { FormStrategy } from 'remix-auth-form';
import { authenticator } from '../auth';
import { AuthApi } from '../endpoints';

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email');
    const password = form.get('password');

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      const user = await AuthApi.login(email as string, password as string);
      return user;
    } catch (error) {
      console.error('Authentication Error:', error);
      throw error;
    }
  }),
  'user-pass',
);
