import { useNavigate } from '@tanstack/react-router';
import { GoArrowLeft } from 'react-icons/go';
import Markdown from 'react-markdown';

import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';

import { Button, CreateReplyModal } from '@/components';
import ReplyItem from '@/components/qna/ReplyItem';

function QuestionDetail() {
  const navigate = useNavigate();

  const { questions, expired } = useSessionStore();

  const { selectedQuestionId, setSelectedQuestionId } = useSessionStore();

  const question = questions.find((q) => q.questionId === selectedQuestionId);

  const { Modal, openModal } = useModal(
    <CreateReplyModal question={question} />,
  );

  if (!question) {
    return null;
  }

  return (
    <>
      <div className='inline-flex h-full w-4/5 flex-grow flex-col items-center justify-start rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-8 py-2'>
          <Button
            className='hover:bg-gray-200 hover:transition-all'
            onClick={() => {
              navigate({ to: '..' });
              setSelectedQuestionId(undefined);
            }}
          >
            <div className='flex flex-row items-center gap-2 text-lg font-medium text-black'>
              <GoArrowLeft />
              <span>질문 목록</span>
            </div>
          </Button>
          {!expired && (
            <Button className='bg-indigo-600' onClick={openModal}>
              <div className='text-sm font-bold text-white'>답변하기</div>
            </Button>
          )}
        </div>

        <div className='inline-flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto pb-4'>
          <div className='flex h-fit flex-col items-start justify-center gap-2.5 self-stretch border-b border-gray-200/50 px-12 py-4'>
            <Markdown className='prose prose-stone flex w-full flex-col gap-3 self-stretch text-base font-medium leading-normal text-black prose-img:rounded-md'>
              {question.body}
            </Markdown>
          </div>
          {question.replies.length === 0 ? (
            <div className='inline-flex h-full w-full select-none items-center justify-center'>
              <div className='font-header text-5xl opacity-30'>
                <span className='text-indigo-600'>A</span>
                <span className='text-black'>sk-It</span>
              </div>
            </div>
          ) : (
            question.replies
              .sort((a, b) => {
                if (b.isHost !== a.isHost) {
                  return b.isHost ? 1 : -1;
                }
                return a.replyId - b.replyId;
              })
              .map((r) => (
                <ReplyItem key={r.replyId} question={question} reply={r} />
              ))
          )}
        </div>
      </div>
      {Modal}
    </>
  );
}

export default QuestionDetail;
