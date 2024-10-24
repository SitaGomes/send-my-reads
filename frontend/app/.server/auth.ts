import { AuthUser } from '@kuma/models';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session';

export const authenticator = new Authenticator<AuthUser>(sessionStorage);
