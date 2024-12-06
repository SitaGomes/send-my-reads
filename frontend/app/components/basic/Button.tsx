type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
  secondary?: boolean;
  children: React.ReactNode;
};

export const Button = ({
  children,
  loadingText = 'Loading...',
  isLoading = false,
  secondary = false,
  ...rest
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  const secondaryStyles =
    'bg-accentColorForeground text-secondaryColor hover:bg-accentColorForeground/90 focus:ring-accentColorForeground';

  const primaryStyles =
    'w-full bg-secondaryColor text-white hover:bg-secondaryColor/90 focus:ring-secondaryColor';

  const loadingStyles = isLoading ? 'cursor-not-allowed opacity-70' : '';

  const className = `${baseStyles} ${
    secondary ? secondaryStyles : primaryStyles
  } ${loadingStyles}`;

  return (
    <button className={className} disabled={isLoading} {...rest}>
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
