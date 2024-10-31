import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session';
import { AuthenticatorAuthUser } from '~/models';

export const authenticator = new Authenticator<AuthenticatorAuthUser>(
  sessionStorage,
);
