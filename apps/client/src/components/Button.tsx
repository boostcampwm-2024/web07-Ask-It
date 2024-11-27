import { HTMLAttributes, PropsWithChildren, Ref } from 'react';

function Button({
  ref,
  children,
  className,
  onClick,
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      className={`flex items-center justify-center rounded-md px-3 py-2 ${className}`}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
