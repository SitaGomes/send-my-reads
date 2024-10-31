import { json, redirect } from '@remix-run/react';
import { useUser } from '../hooks';
import { ROUTES } from '~/constants';
import { LoaderFunction } from '@remix-run/node';
import { getSession } from '~/.server';
import { AuthUser } from '~/models';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user') as AuthUser | null;

  if (!user) {
    throw redirect(ROUTES.LANDING_PAGE);
  }

  return json({ user });
};

export default function AppIndex() {
  const user = useUser();

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
    </div>
  );
}
