import {
  type ActionFunctionArgs,
  json,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from '@remix-run/react';
import { ROUTES } from '../constants/ROUTES';
import {
  authenticator,
  commitSession,
  getSession,
  getSessionData,
} from '../.server';
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

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await getSessionData(request);

  if (user) {
    throw redirect(ROUTES.HOME);
  }

  return null;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const errors = {
    email: '',
    password: '',
    control: '',
  };

  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 6) {
    errors.password = 'Password should be at least 6 characters';
  }

  if (errors.email || errors.password) {
    return json({ errors });
  }

  try {
    const user = await authenticator.authenticate('user-pass', request);

    const session = await getSession(request.headers.get('Cookie'));
    session.set('user', user);

    return redirect(ROUTES.HOME, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Response) {
      if (error.status === 302) {
        return json(
          {
            errors: {
              ...errors,
              control:
                error instanceof Error
                  ? error.message
                  : 'Invalid password or email',
            },
          },
          { status: 401 },
        );
      }
    }

    return json(
      {
        errors: {
          ...errors,
          control:
            error instanceof Error
              ? error.message
              : 'Invalid password or email',
        },
      },
      { status: 401 },
    );
  }
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
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
              type="button"
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
          disabled={isSubmitting}
          className={`w-full rounded-md bg-secondaryColor px-4 py-2 text-sm font-medium text-white hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-seconDabg-secondaryColor focus:ring-offset-2 ${
            isSubmitting ? 'cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
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
    </>
  );
}
