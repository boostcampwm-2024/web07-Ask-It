import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

import { useModalContext } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import {
  patchReplyBody,
  postReply,
  Question,
  Reply,
} from '@/features/session/qna';
import { useToastStore } from '@/features/toast';

import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';

interface CreateReplyModalProps {
  question?: Question;
  reply?: Reply;
}

function CreateReplyModal({ question, reply }: CreateReplyModalProps) {
  const { closeModal } = useModalContext();

  const { addToast } = useToastStore();

  const { sessionToken, sessionId, expired, addReply, updateReply } =
    useSessionStore();

  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (expired || !sessionId || !sessionToken) return;

    if (!reply && question) {
      postReply({
        sessionId,
        token: sessionToken,
        questionId: question?.questionId,
        body,
      }).then((res) => {
        addReply(question.questionId, { ...res.reply, deleted: false });
        addToast({
          type: 'SUCCESS',
          message: '답변이 성공적으로 등록되었습니다.',
          duration: 3000,
        });
        closeModal();
      });
    } else if (reply && question) {
      patchReplyBody(reply.replyId, {
        token: sessionToken,
        sessionId,
        body,
      }).then((res) => {
        updateReply(question.questionId, res.reply);
        addToast({
          type: 'SUCCESS',
          message: '답변이 성공적으로 수정되었습니다.',
          duration: 3000,
        });
        closeModal();
      });
    }
  };

  useEffect(() => {
    if (reply) setBody(reply.body);
  }, [reply]);

  return (
    <Modal>
      <div className='inline-flex h-[40dvh] w-[600px] flex-col items-center justify-center gap-2.5'>
        <div className='inline-flex items-center justify-start gap-2.5 self-stretch border-b border-gray-200 pb-1'>
          <div className='text-lg font-semibold text-black'>답변하기</div>
        </div>
        <div className='inline-flex h-[30dvh] shrink grow basis-0 items-center justify-center gap-2.5 self-stretch'>
          <textarea
            className='shrink grow basis-0 resize-none flex-col items-start justify-start gap-2 self-stretch whitespace-pre-wrap rounded border border-gray-200 bg-white p-4 focus:outline-none'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`**답변을 남겨주세요**\n**(마크다운 지원)**`}
          />
          <div className='inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2 self-stretch overflow-y-auto rounded border border-gray-200 bg-white p-4'>
            <Markdown className='prose prose-stone flex w-full flex-col gap-3 prose-img:rounded-md'>
              {body.length === 0
                ? `**답변을 남겨주세요**\n\n**(마크다운 지원)**`
                : body}
            </Markdown>
          </div>
        </div>
        <div className='flex h-fit flex-col items-end justify-center gap-2.5 self-stretch'>
          <div className='inline-flex items-center justify-center gap-2.5'>
            <Button className='bg-gray-500' onClick={closeModal}>
              <div className='text-sm font-bold text-white'>취소하기</div>
            </Button>
            <Button className='bg-indigo-600' onClick={handleSubmit}>
              <div className='text-sm font-bold text-white'>
                {reply ? '수정하기' : '생성하기'}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateReplyModal;
