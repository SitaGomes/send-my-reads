import { createCookieSessionStorage } from '@remix-run/node';
import { AuthenticatorAuthUser } from '~/models';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '@send-my-reads_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET || 'my-secret-key'],
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

export const getSessionData = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'),
  );
  const user = session.get('user') as AuthenticatorAuthUser | null;

  return {
    token: user?.token || '',
    user: user?.user || null,
  };
};

export const { getSession, commitSession, destroySession } = sessionStorage;
