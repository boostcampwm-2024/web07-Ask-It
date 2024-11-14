import { useState } from 'react';
import Markdown from 'react-markdown';

import { Button } from '@/components';
import Modal from '@/components/modal/Modal';
import { useModalContext } from '@/features/modal';

function CreateQuestionModal() {
  const { closeModal } = useModalContext();

  const [body, setBody] = useState('');

  return (
    <Modal>
      <div className='inline-flex h-fit w-[600px] flex-col items-center justify-center gap-2.5'>
        <div className='inline-flex items-center justify-start gap-2.5 self-stretch border-b border-gray-200 pb-1'>
          <div className='text-lg font-semibold text-black'>질문하기</div>
        </div>
        <div className='inline-flex min-h-[550px] shrink grow basis-0 items-center justify-center gap-2.5 self-stretch'>
          <textarea
            className='shrink grow basis-0 resize-none flex-col items-start justify-start gap-2 self-stretch whitespace-pre-wrap rounded border border-gray-200 bg-white p-4 focus:outline-none'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='질문을 입력해주세요'
            rows={4}
          />
          <div className='inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2 self-stretch overflow-y-auto rounded border border-gray-200 bg-white p-4'>
            <Markdown className='prose prose-stone flex w-full flex-col gap-3 prose-img:rounded-md'>
              {body}
            </Markdown>
          </div>
        </div>
        <div className='flex h-fit flex-col items-end justify-center gap-2.5 self-stretch'>
          <div className='inline-flex items-center justify-center gap-2.5'>
            <Button className='bg-indigo-600'>
              <div className='text-xs font-bold text-white'>생성하기</div>
            </Button>
            <Button className='bg-gray-500' onClick={closeModal}>
              <div className='text-xs font-bold text-white'>취소하기</div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateQuestionModal;
