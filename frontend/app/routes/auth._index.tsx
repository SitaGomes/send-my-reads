import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { ROUTES } from '../constants/ROUTES';
import { authenticator } from '../.server';

export default function LoginPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {actionData?.errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {actionData.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {actionData?.errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {actionData.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const errors = {
    email: '',
    password: '',
  };

  if (!email.includes('@') || !email.includes('@yupmail')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 12) {
    errors.password = 'Password should be at least 12 characters';
  }

  if (errors.email || errors.password) {
    return json({ errors });
  }

  return await authenticator.authenticate('user-pass', request, {
    successRedirect: ROUTES.HOME,
    failureRedirect: ROUTES.LOGIN,
  });
}
