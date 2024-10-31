import { ActionFunctionArgs, json, MetaFunction } from '@remix-run/node';
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from '@remix-run/react';
import { AuthApi } from '../.server/endpoints';
import { ROUTES } from '../constants';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Create account | Send My Reads' },
    {
      name: 'description',
      content:
        'Create an account on Send My Reads to organize your books, send them to Kindle, and read anywhere.',
    },
  ];
};

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isSubmitting = navigate.state === 'submitting';

  return (
    <div className="flex flex-col h-screen items-center">
      <Link to={ROUTES.LANDING_PAGE} className="flex items-center gap-2 mt-4">
        <img src="/Icon-secondary.svg" alt="Send My Reads" />
        <h1 className="font-bold text-xl lg:text-2xl">Send My Reads</h1>
      </Link>

      <div className="flex flex-col gap-8 h-full justify-center">
        <h1 className="font-bold text-xl lg:text-2xl">Create an account</h1>

        <Form method="post" className="space-y-6">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="email" className="text-secondaryColor">
              Username
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
            />
            {actionData?.errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {actionData.errors.name}
              </p>
            )}
          </div>

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
                type="button"
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

          <div className="flex flex-col items-start w-full">
            <label htmlFor="confirmPassword" className="text-secondaryColor">
              Confirm password
            </label>
            <div className="flex gap-4 w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
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
            {actionData?.errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {actionData.errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full rounded-md bg-secondaryColor px-4 py-2 text-sm font-medium text-white hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-seconDabg-secondaryColor focus:ring-offset-2 ${
              isSubmitting ? 'cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create account'}
          </button>
          <p>
            Do you have an account?{' '}
            <Link
              className="hover:underline text-secondaryColor"
              to={ROUTES.LOGIN}
            >
              Login here
            </Link>
          </p>
          {actionData?.errors.control && (
            <p className="mt-2 text-sm text-red-600">
              {actionData.errors.control}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const confirmPassword = String(formData.get('confirmPassword'));

  const errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    control: '',
  };

  if (!email.includes('@') || email.includes('@yupmail')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 6) {
    errors.password = 'Password should be at least 12 characters';
  }

  if (name.length < 3) {
    errors.name = 'Name should be at least 3 characters';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (
    errors.email ||
    errors.password ||
    errors.confirmPassword ||
    errors.name
  ) {
    return json({ errors });
  }

  try {
    await AuthApi.register(name, email, password);

    return redirect(ROUTES.LOGIN);
  } catch (error) {
    console.log(error);

    return json(
      {
        errors: {
          ...errors,
          control: 'Invalid email',
        },
      },
      { status: 401 },
    );
  }
}
