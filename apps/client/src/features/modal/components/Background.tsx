import { PropsWithChildren, useEffect } from 'react';

import { useModalContext } from '@/features/modal';

function Background({ children }: PropsWithChildren) {
  const { closeModal } = useModalContext();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  return (
    <button
      type='button'
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
        }
      }}
      className='fixed left-0 top-0 z-10 flex h-dvh w-dvw cursor-auto items-center justify-center bg-[#808080]/20 backdrop-blur-sm'
    >
      {children}
    </button>
  );
}

export default Background;
