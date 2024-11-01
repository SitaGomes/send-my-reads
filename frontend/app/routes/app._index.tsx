import { Form, json, Outlet, redirect } from '@remix-run/react';
import { useUser } from '../hooks';
import { ROUTES } from '~/constants';
import { ActionFunctionArgs, LoaderFunction } from '@remix-run/node';
import { authenticator, getSession } from '~/.server';
import { AuthUser } from '~/models';
import { Link } from '~/components/basic/Link';

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
    <div className="flex min-h-screen">
      <header className="bg-accentColorForeground p-4 flex flex-col gap-4 justify-start">
        <Link to={ROUTES.BOOKS}>Coleção</Link>
        <Link to={ROUTES.PROFILE}>Perfil</Link>
        <Form method="post">
          <button>Sair</button>
        </Form>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: ROUTES.LOGIN });
}
