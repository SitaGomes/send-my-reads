import { LoaderFunction, redirect } from '@remix-run/node';
import { getSession } from '~/.server';
import { ROUTES } from '~/constants';
import { AuthUser } from '~/models';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user') as AuthUser | null;

  if (!user) {
    throw redirect(ROUTES.LANDING_PAGE);
  }

  throw redirect(ROUTES.BOOKS);
};

export default function AppLayoutRedirect() {
  return null;
}
