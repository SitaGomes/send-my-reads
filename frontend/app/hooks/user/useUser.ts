import { useLoaderData } from '@remix-run/react';
import { AuthenticatorAuthUser, AuthUser } from '~/models';

type LoaderData = {
  user: AuthenticatorAuthUser | null;
};

type UseUserReturn = AuthUser | null;

export function useUser(): UseUserReturn {
  const response = useLoaderData<LoaderData>();
  if (response?.user?.user) {
    return {
      ...response.user.user,
      updatedAt: new Date(response.user.user.updatedAt),
      createdAt: new Date(response.user.user.createdAt),
    };
  }
  return null;
}
