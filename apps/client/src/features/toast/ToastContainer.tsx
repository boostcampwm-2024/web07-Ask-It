import { createPortal } from 'react-dom';

import { useToastStore } from '@/features/toast/toast.store';
import ToastMessage from '@/features/toast/ToastMessage';

function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return createPortal(
    <div className='fixed bottom-4 left-4 z-20 flex h-fit w-fit min-w-[200px] max-w-[300px] flex-col gap-4'>
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body,
  );
}

export default ToastContainer;
