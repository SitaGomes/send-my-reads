import { Link as ExternalLink } from '@remix-run/react';
import { PropsWithChildren } from 'react';

type LinkProps = {
  to: string;
  special?: boolean;
};

export const Link = ({
  to,
  special,
  children,
}: PropsWithChildren<LinkProps>) => {
  return special ? (
    <ExternalLink
      className="hover:underline text-secondaryColor bg-slate-100 hover: rounded-md p-2"
      to={to}
    >
      {children}
    </ExternalLink>
  ) : (
    <ExternalLink to={to} className="hover:underline hover:text-accentColor">
      {children}
    </ExternalLink>
  );
};
