import { FormStrategy } from 'remix-auth-form';
import { authenticator } from '../auth';
import { AuthApi } from '../endpoints';

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = (form.get('email') as string) || '';
    const password = (form.get('password') as string) || '';

    const { user } = await AuthApi.login(email, password);

    return user;
  }),
  'user-pass',
);
