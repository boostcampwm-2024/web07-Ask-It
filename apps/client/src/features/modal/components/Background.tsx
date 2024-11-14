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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) closeModal();
      }}
      onKeyDown={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      className='fixed left-0 top-0 z-10 flex h-dvh w-dvw cursor-auto items-center justify-center bg-[#808080]/20 backdrop-blur-sm'
    >
      {children}
    </div>
  );
}

export default Background;
