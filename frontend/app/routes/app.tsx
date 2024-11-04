import { Form, json, Outlet, redirect } from '@remix-run/react';
import { ROUTES } from '~/constants';
import {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { authenticator, getSession } from '~/.server';
import { AuthUser } from '~/models';
import { Link } from '~/components/basic/Link';

export const meta: MetaFunction = () => {
  return [{ title: 'Send My Reads' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user') as AuthUser | null;

  if (!user) {
    throw redirect(ROUTES.LANDING_PAGE);
  }

  return json({ user });
};

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <header className="bg-accentColorForeground p-4 flex flex-col gap-4 justify-start">
        <Link to={ROUTES.BOOKS}>Bookshelf</Link>
        <Link to={ROUTES.PROFILE}>Profile</Link>
        <Form method="post">
          <button>Sair</button>
        </Form>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet context={{ test: 'test' }} />
      </main>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: ROUTES.LOGIN });
}

export function ErrorBoundary() {
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
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <h1 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
            Oops! Something went wrong.
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </main>
    </div>
  );
}
