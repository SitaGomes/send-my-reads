import { Link as ExternalLink } from '@remix-run/react';
import { PropsWithChildren } from 'react';

type LinkProps = {
  to: string;
  special?: boolean;
};

export const Link = ({
  to,
  special = false,
  children,
}: PropsWithChildren<LinkProps>) => {
  const baseStyles =
    'inline-flex items-center transition-all duration-200 ease-in-out';

  const specialStyles =
    'text-secondaryColor bg-accentColorForeground hover:bg-accentColorForeground/90 px-3 py-1.5 rounded-md shadow-sm';

  const standardStyles =
    'text-primaryColor hover:underline hover:text-accentColor';

  return (
    <ExternalLink
      to={to}
      className={`${baseStyles} ${special ? specialStyles : standardStyles}`}
    >
      {children}
    </ExternalLink>
  );
};
