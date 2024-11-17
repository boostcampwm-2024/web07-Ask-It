import { useState } from 'react';
import Markdown from 'react-markdown';

import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import { useModalContext } from '@/features/modal';

interface CreateReplyModalProps {
  questionBody: string;
}

function CreateReplyModal({ questionBody }: CreateReplyModalProps) {
  const { closeModal } = useModalContext();

  const [reply, setReply] = useState('');

  return (
    <Modal>
      <div className='inline-flex h-[40dvh] w-[600px] flex-col items-center justify-center gap-2.5'>
        <div className='inline-flex items-center justify-start gap-2.5 self-stretch border-b border-gray-200 pb-1'>
          <div className='text-lg font-semibold text-black'>답변하기</div>
        </div>
        <div className='inline-flex h-[40dvh] shrink grow basis-0 items-center justify-center gap-2.5 self-stretch'>
          <textarea
            className='shrink grow basis-0 resize-none flex-col items-start justify-start gap-2 self-stretch whitespace-pre-wrap rounded border border-gray-200 bg-white p-4 focus:outline-none'
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder='질문을 입력해주세요'
          />
          <div className='inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2 self-stretch overflow-y-auto rounded border border-gray-200 bg-white p-4'>
            <Markdown className='prose prose-stone flex w-full flex-col gap-3 prose-img:rounded-md'>
              {questionBody}
            </Markdown>
          </div>
        </div>
        <div className='flex h-fit flex-col items-end justify-center gap-2.5 self-stretch'>
          <div className='inline-flex items-center justify-center gap-2.5'>
            <Button className='bg-indigo-600'>
              <div className='text-sm font-bold text-white'>생성하기</div>
            </Button>
            <Button className='bg-gray-500' onClick={closeModal}>
              <div className='text-sm font-bold text-white'>취소하기</div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateReplyModal;
