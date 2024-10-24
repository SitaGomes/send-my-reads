import { useNavigate } from '@remix-run/react';
import { ROUTES } from '../constants/ROUTES';
import { useUser } from '../hooks';

export default function AppIndex() {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) {
    return navigate(ROUTES.LANDING_PAGE);
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
    </div>
  );
}
