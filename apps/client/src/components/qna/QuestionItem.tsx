import Markdown from 'react-markdown';

import { Button, CreateQuestionModal } from '@/components';
import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import {
  deleteQuestion,
  patchQuestionClosed,
  patchQuestionPinned,
  postQuestionLike,
  Question,
} from '@/features/session/qna';
import { useToastStore } from '@/features/toast';

interface QuestionItemProps {
  question: Question;
  onQuestionSelect: () => void;
}

function QuestionItem({ question, onQuestionSelect }: QuestionItemProps) {
  const { addToast } = useToastStore();

  const { Modal, openModal } = useModal(
    <CreateQuestionModal question={question} />,
  );

  const {
    sessionToken,
    sessionId,
    isHost,
    expired,
    removeQuestion,
    updateQuestion,
  } = useSessionStore();

  const handleLike = () => {
    if (expired || !sessionToken || !sessionId) return;

    postQuestionLike(question.questionId, {
      token: sessionToken,
      sessionId,
    }).then((res) => {
      addToast({
        type: 'SUCCESS',
        message: question.liked
          ? '좋아요를 취소했습니다.'
          : '질문에 좋아요를 눌렀습니다.',
        duration: 3000,
      });
      updateQuestion({
        ...question,
        ...res,
      });
    });
  };

  const handleClose = () => {
    if (expired || !sessionToken || !sessionId || !isHost) return;

    patchQuestionClosed(question.questionId, {
      token: sessionToken,
      sessionId,
      closed: !question.closed,
    }).then(() => {
      addToast({
        type: 'SUCCESS',
        message: question.closed
          ? '질문 답변 완료를 취소했습니다.'
          : '질문을 답변 완료했습니다.',
        duration: 3000,
      });
      updateQuestion({
        ...question,
        closed: !question.closed,
      });
    });
  };

  const handlePin = () => {
    if (expired || !sessionToken || !sessionId || !isHost) return;

    patchQuestionPinned(question.questionId, {
      token: sessionToken,
      sessionId,
      pinned: !question.pinned,
    }).then(() => {
      addToast({
        type: 'SUCCESS',
        message: question.pinned
          ? '질문 고정을 취소했습니다.'
          : '질문을 고정했습니다.',
        duration: 3000,
      });
      updateQuestion({
        ...question,
        pinned: !question.pinned,
      });
    });
  };

  const handleDelete = () => {
    if (expired || !sessionToken || !sessionId) return;

    deleteQuestion(question.questionId, {
      sessionId,
      token: sessionToken,
    }).then(() => {
      addToast({
        type: 'SUCCESS',
        message: '질문을 삭제했습니다.',
        duration: 3000,
      });
      removeQuestion(question.questionId);
    });
  };

  return (
    <>
      <div
        className={`inline-flex h-fit w-full flex-col items-start justify-start gap-4 rounded-lg border ${question.pinned ? 'border-indigo-200' : 'border-gray-200'} bg-white px-4 py-2`}
      >
        <div className='flex h-fit flex-col items-start justify-start gap-2 self-stretch border-b border-gray-200 px-2.5 pb-4 pt-2.5'>
          <div className='inline-flex items-start justify-between gap-4 self-stretch'>
            <Markdown className='prose prose-stone flex h-full w-full flex-col justify-start gap-3 text-base font-medium leading-normal text-black prose-img:rounded-md'>
              {question.body}
            </Markdown>
            <div className='flex flex-col gap-2'>
              {(isHost || (!isHost && question.closed)) && (
                <Button
                  onClick={handleClose}
                  className={`scale-y-90 self-start transition-colors duration-200 ${
                    question.closed
                      ? 'bg-green-100 hover:bg-green-200'
                      : 'bg-red-100 hover:bg-red-200'
                  }`}
                >
                  <div
                    className={`self-start text-base font-medium ${
                      question.closed ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    ✓
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className='inline-flex w-full justify-between'>
          <div className='inline-flex items-center justify-start gap-2'>
            <Button
              className='hover:bg-gray-200/50 hover:transition-all'
              onClick={handleLike}
            >
              <div>
                <span className='text-sm font-medium text-black'>👍 </span>
                <span className='text-sm font-medium text-gray-500'>
                  {question.likesCount}
                </span>
              </div>
            </Button>
            {isHost && (
              <Button
                className='hover:bg-gray-200/50 hover:transition-all'
                onClick={handlePin}
              >
                <div>
                  <span className='text-sm font-medium text-black'>📌 </span>
                  <span className='text-sm font-medium text-gray-500'>Pin</span>
                </div>
              </Button>
            )}
            <Button
              className='hover:bg-gray-200/50 hover:transition-all'
              onClick={onQuestionSelect}
            >
              <div className='text-sm font-medium text-indigo-600'>
                💬 답글 {`${question.replies.length}`}
              </div>
            </Button>
          </div>

          <div className='inline-flex items-center justify-start gap-2 px-2'>
            {!expired &&
              question.isOwner &&
              !question.closed &&
              question.replies.length === 0 && (
                <>
                  <Button
                    className='scale-y-90 bg-gray-200/25 hover:bg-gray-200/50 hover:transition-all'
                    onClick={openModal}
                  >
                    ✎
                  </Button>
                  <Button
                    className='scale-y-90 bg-red-200/25 text-red-600 hover:bg-red-200/50 hover:transition-all'
                    onClick={handleDelete}
                  >
                    X
                  </Button>
                </>
              )}
          </div>
        </div>
      </div>
      {Modal}
    </>
  );
}

export default QuestionItem;
