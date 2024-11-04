import { Link, Outlet } from '@remix-run/react';
import { ROUTES } from '~/constants';

export default function AuthLayout() {
  return (
    <div className="flex flex-col h-screen items-center">
      <Link to={ROUTES.LANDING_PAGE} className="flex items-center gap-2 mt-4">
        <img src="/Icon-secondary.svg" alt="Send My Reads" />
        <h1 className="font-bold text-xl lg:text-2xl">Send My Reads</h1>
      </Link>

      <div className="flex flex-col gap-8 h-full justify-center">
        <Outlet />
      </div>
    </div>
  );
}
