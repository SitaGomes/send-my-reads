type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
  secondary?: boolean;
  children: React.ReactNode;
};

export const Button = ({
  children,
  loadingText,
  isLoading,
  secondary,
  ...rest
}: ButtonProps) => {
  const className = secondary
    ? 'rounded-md bg-accentColorForeground px-4 py-2 text-sm font-medium text-secondaryColor hover:bg-accentColorForeground focus:outline-none focus:ring-2 focus:ring-accbg-accentColorForeground focus:ring-offset-2'
    : `w-full rounded-md bg-secondaryColor px-4 py-2 text-sm font-medium text-white hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-seconDabg-secondaryColor focus:ring-offset-2 ${
        isLoading ? 'cursor-not-allowed' : ''
      }`;

  return (
    <button className={className} {...rest}>
      {isLoading ? loadingText : children}
    </button>
  );
};
