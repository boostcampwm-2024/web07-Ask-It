import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

import { useModalContext } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import { patchReplyBody, postReply, Question, Reply } from '@/features/session/qna';
import { useToastStore } from '@/features/toast';

import Button from '@/components/Button';

interface CreateReplyModalProps {
  question?: Question;
  reply?: Reply;
}

function CreateReplyModal({ question, reply }: CreateReplyModalProps) {
  const { closeModal } = useModalContext();

  const { addToast } = useToastStore();

  const { sessionToken, sessionId, expired, addReply, updateReply } = useSessionStore();

  const [body, setBody] = useState('');

  const { mutate: postReplyQuery, isPending: isPostInProgress } = useMutation({
    mutationFn: postReply,
    onSuccess: (res) => {
      if (!reply && question) {
        addReply(question.questionId, {
          ...res.reply,
          userId: null,
          deleted: false,
        });
        addToast({
          type: 'SUCCESS',
          message: '답변이 성공적으로 등록되었습니다.',
          duration: 3000,
        });
        closeModal();
      }
    },
    onError: console.error,
  });

  const { mutate: patchReplyBodyQuery, isPending: isPatchInProgress } = useMutation({
    mutationFn: (params: { replyId: number; token: string; sessionId: string; body: string }) =>
      patchReplyBody(params.replyId, {
        token: params.token,
        sessionId: params.sessionId,
        body: params.body,
      }),
    onSuccess: (res) => {
      if (reply && question) {
        updateReply(question.questionId, res.reply);
        addToast({
          type: 'SUCCESS',
          message: '답변이 성공적으로 수정되었습니다.',
          duration: 3000,
        });
        closeModal();
      }
    },
    onError: console.error,
  });

  const submitDisabled =
    expired || body.trim().length === 0 || !sessionId || !sessionToken || isPostInProgress || isPatchInProgress;

  const handleSubmit = () => {
    if (submitDisabled) return;

    if (!reply && question) {
      postReplyQuery({
        sessionId,
        token: sessionToken,
        questionId: question?.questionId,
        body,
      });
    } else if (reply && question) {
      patchReplyBodyQuery({
        replyId: reply.replyId,
        token: sessionToken,
        sessionId,
        body,
      });
    }
  };

  useEffect(() => {
    if (reply) setBody(reply.body);
  }, [reply]);

  return (
    <div className='inline-flex h-[50dvh] w-[50dvw] flex-col items-center justify-center gap-2.5 rounded-lg bg-gray-50 p-8 shadow'>
      <div className='inline-flex h-full w-full flex-grow flex-col items-center justify-center gap-4'>
        <div className='inline-flex items-center justify-start gap-2.5 self-stretch border-b border-gray-200 pb-1'>
          <div className='text-lg font-semibold text-black'>답변하기</div>
        </div>
        <div className='max-h-[20dvh] self-stretch overflow-y-auto border-b border-gray-200 py-4 text-left font-medium text-gray-700'>
          {question && (
            <Markdown className='prose prose-stone flex w-full flex-col gap-3 prose-img:rounded-md'>
              {question.body}
            </Markdown>
          )}
        </div>
        <div className='inline-flex h-full max-h-[25dvh] shrink grow basis-0 items-center justify-center gap-2.5 self-stretch'>
          <textarea
            className='h-full shrink grow basis-0 resize-none flex-col items-start justify-start gap-2 self-stretch whitespace-pre-wrap rounded border border-gray-200 bg-white p-4 focus:outline-none'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`**답변을 남겨주세요**\n**(마크다운 지원)**`}
          />
          <div className='inline-flex h-full shrink grow basis-0 flex-col items-start justify-start gap-2 self-stretch overflow-y-auto rounded border border-gray-200 bg-white p-4'>
            <Markdown className='prose prose-stone flex w-full flex-col gap-3 prose-img:rounded-md'>
              {body.length === 0 ? `**답변을 남겨주세요**\n\n**(마크다운 지원)**` : body}
            </Markdown>
          </div>
        </div>
        <div className='flex h-fit flex-col items-end justify-center gap-2.5 self-stretch'>
          <div className='inline-flex items-center justify-center gap-2.5'>
            <Button className='bg-gray-500' onClick={closeModal}>
              <div className='text-sm font-bold text-white'>취소하기</div>
            </Button>
            <Button
              className={`${!submitDisabled ? 'bg-indigo-600' : 'cursor-not-allowed bg-indigo-300'}`}
              onClick={handleSubmit}
            >
              <div className='text-sm font-bold text-white'>{reply ? '수정하기' : '생성하기'}</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateReplyModal;
