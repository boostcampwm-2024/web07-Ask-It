import { useModalContext } from '@/features/modal';

import Button from '@/components/Button';

interface DeleteConfirmModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

function DeleteConfirmModal({ onCancel, onConfirm }: DeleteConfirmModalProps) {
  const { closeModal } = useModalContext();

  return (
    <div className='inline-flex flex-col items-center justify-center gap-2.5 rounded-lg bg-gray-50 p-8 shadow'>
      <div className='flex h-[8dvh] min-w-[20dvw] flex-col justify-center gap-2'>
        <div className='w-full text-center font-bold'>
          <span>정말 삭제하시겠습니까?</span>
        </div>
        <div className='mx-auto mt-4 inline-flex w-full items-start justify-center gap-2.5'>
          <Button
            className='w-full bg-gray-500'
            onClick={() => {
              onCancel?.();
              closeModal();
            }}
          >
            <span className='flex-grow text-sm font-medium text-white'>취소하기</span>
          </Button>
          <Button
            className='w-full bg-indigo-600 transition-colors duration-200'
            onClick={() => {
              onConfirm?.();
              closeModal();
            }}
          >
            <span className='flex-grow text-sm font-medium text-white'>삭제하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
