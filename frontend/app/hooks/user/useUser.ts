import { useOutletContext } from '@remix-run/react';
import { AuthUser } from '~/models';

type OutletContextType = {
  user: AuthUser | null;
};

export function useUser() {
  const props = useOutletContext<OutletContextType>();
  return props.user;
}
