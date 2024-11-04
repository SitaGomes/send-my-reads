import { json, LoaderFunction, MetaFunction, redirect } from '@remix-run/node';
import { getSession } from '~/.server';
import { ROUTES } from '~/constants';
import { useUser } from '~/hooks';
import { AuthUser } from '~/models';

export const meta: MetaFunction = () => {
  return [{ title: 'BookShelf | Send My Reads' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user') as AuthUser | null;

  if (!user) {
    throw redirect(ROUTES.LANDING_PAGE);
  }

  return json({ user });
};

export default function Page() {
  const user = useUser();

  if (!user) return null;

  return (
    <div>
      <h1>{user.username}&apos;s Bookshlef</h1>
    </div>
  );
}
