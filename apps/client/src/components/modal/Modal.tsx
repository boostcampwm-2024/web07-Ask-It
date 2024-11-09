import { PropsWithChildren } from 'react';

function Modal({ children }: PropsWithChildren) {
  return (
    <div className='inline-flex h-fit min-h-[195px] w-fit min-w-[475px] flex-col items-center justify-center gap-2.5 rounded-lg bg-gray-50 p-8 shadow'>
      {children}
    </div>
  );
}

export default Modal;
