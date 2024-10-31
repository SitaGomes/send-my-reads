import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session';
import { AuthUser } from '~/models';

type AuthenticatorAuthUser = {
  user: AuthUser;
  token: string;
};

export const authenticator = new Authenticator<AuthenticatorAuthUser>(
  sessionStorage,
);
