import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, onClick } = props;

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
});

Button.displayName = 'Button';

export default Button;
