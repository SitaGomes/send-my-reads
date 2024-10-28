import { cn } from '~/utils/cn';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('max-w-6xl mx-auto w-full', className)}>{children}</div>
  );
};
