import { PropsWithChildren } from 'react';

function Background({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='fixed left-0 top-0 z-10 flex h-dvh w-dvw cursor-auto items-center justify-center bg-[#808080]/20 backdrop-blur-sm'
    >
      {children}
    </button>
  );
}

export default Background;
