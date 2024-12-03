import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

const Button = forwardRef<HTMLButtonElement, ButtonProps & { disabled?: boolean }>((props, ref) => {
  const { children, className, disabled, onClick } = props;

  return (
    <button
      disabled={disabled}
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
