import { useState } from 'react';

import Button from '@/components/Button';
import InputField from '@/components/modal/InputField';
import Modal from '@/components/modal/Modal';
import { useModalContext } from '@/features/modal';

function CreateSessionModal() {
  const { closeModal } = useModalContext();

  const [sessionName, setSessionName] = useState('');

  return (
    <Modal>
      <div className='flex h-fit flex-col items-center justify-start gap-4 self-stretch rounded p-4'>
        <div className='text-2xl font-bold text-indigo-600'>Ask-It</div>
        <InputField
          label='세션 이름'
          type='text'
          value={sessionName}
          onChange={setSessionName}
          placeholder='세션 이름을 입력해주세요'
        />
      </div>
      <div className='mt-4 inline-flex items-start justify-start gap-2.5'>
        <Button
          className='bg-indigo-600'
          onClick={() => {
            // TODO: 세션 생성 API 요청 후, 세션 화면으로 이동
            closeModal();
          }}
        >
          <div className='w-[150px] text-sm font-medium text-white'>
            세션 생성하기
          </div>
        </Button>
        <Button className='bg-gray-500' onClick={closeModal}>
          <div className='w-[150px] text-sm font-medium text-white'>
            취소하기
          </div>
        </Button>
      </div>
    </Modal>
  );
}

export default CreateSessionModal;
