import type { MetaFunction } from '@remix-run/node';
import { Link, useNavigate } from '@remix-run/react';
import { ROUTES } from '../constants/ROUTES';
import { useUser } from '../hooks';

export const meta: MetaFunction = () => {
  return [
    { title: 'create-kuma-app' },
    {
      name: 'description',
      content:
        'Scaffold a production ready project with cutting-edge technologies',
    },
  ];
};

export default function Index() {
  const user = useUser();
  const navigate = useNavigate();

  if (user) {
    return navigate(ROUTES.HOME);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          create-kuma-app
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Scaffold a production ready project with Remix, NestJS, TailwindCSS,
          Shadcn, Radix UI, and more.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              {tech.icon}
              <span className="mt-2 font-semibold text-gray-700 dark:text-gray-200">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link
            to={ROUTES.LOGIN}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}

const technologies = [
  {
    name: 'Remix',
    icon: (
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    ),
  },
  {
    name: 'NestJS',
    icon: (
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    ),
  },
  {
    name: 'TailwindCSS',
    icon: (
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    ),
  },
  {
    name: 'Shadcn',
    icon: (
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    ),
  },
  {
    name: 'Tanstack Query',
    icon: (
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    ),
  },
];
