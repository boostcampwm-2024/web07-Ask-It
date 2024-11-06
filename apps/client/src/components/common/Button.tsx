import { HTMLAttributes, PropsWithChildren } from 'react';

function Button({
  children,
  className,
  onClick,
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`flex items-center justify-center rounded-md px-3 py-2 ${className}`}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
