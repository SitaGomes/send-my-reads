import { ActionFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { ROUTES } from '../constants/ROUTES';
import { authenticator } from '../.server';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Login | Send My Reads' },
    {
      name: 'description',
      content:
        'Login to your Send My Reads account to organize your books, send them to Kindle, and read anywhere.',
    },
  ];
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen items-center">
      <Link to={ROUTES.LANDING_PAGE} className="flex items-center gap-2 mt-4">
        <img src="/Icon-secondary.svg" alt="Send My Reads" />
        <h1 className="font-bold text-xl lg:text-2xl">Send My Reads</h1>
      </Link>

      <div className="flex flex-col gap-8 h-full justify-center">
        <h1 className="font-bold text-xl lg:text-2xl">Login</h1>

        <Form method="post" className="space-y-6">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="email" className="text-secondaryColor">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
            />
            {actionData?.errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {actionData.errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start w-full">
            <label htmlFor="password" className="text-secondaryColor">
              Password
            </label>
            <div className="flex gap-4 w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
              />

              <button
                onClick={togglePassword}
                className="rounded-md bg-accentColorForeground px-4 py-2 text-sm font-medium text-secondaryColor hover:bg-accentColorForeground focus:outline-none focus:ring-2 focus:ring-accbg-accentColorForeground focus:ring-offset-2"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>
            {actionData?.errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {actionData.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-secondaryColor px-4 py-2 text-sm font-medium text-white hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-seconDabg-secondaryColor focus:ring-offset-2"
          >
            Login
          </button>
          <p>
            Doesn&apos;t have an account?{' '}
            <Link
              className="hover:underline text-secondaryColor"
              to={ROUTES.REGISTER}
            >
              Get Started today
            </Link>
          </p>
          {actionData?.errors.control && (
            <p className="text-red-600 min-w-7">{actionData.errors.control}</p>
          )}
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const errors = {
    email: '',
    password: '',
    control: '',
  };

  if (!email.includes('@') || email.includes('@yupmail')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 6) {
    errors.password = 'Password should be at least 6 characters';
  }

  if (errors.email || errors.password) {
    return json({ errors });
  }

  try {
    return await authenticator.authenticate('user-pass', request, {
      successRedirect: '/app',
      failureRedirect: '/auth',
    });
  } catch (error) {
    const e = error as Error;
    console.error(e);
    return json({ errors: { ...errors, control: e.message } }, { status: 401 });
  }
}
