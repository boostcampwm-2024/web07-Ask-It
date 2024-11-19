import Markdown from 'react-markdown';

import { Button, CreateReplyModal } from '@/components';
import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import {
  deleteReply,
  postReplyLike,
  Question,
  Reply,
} from '@/features/session/qna';

interface ReplyItemProps {
  question: Question;
  reply: Reply;
}

function ReplyItem({ question, reply }: ReplyItemProps) {
  const { sessionId, sessionToken, updateReply } = useSessionStore();

  const { Modal, openModal } = useModal(
    <CreateReplyModal question={question} reply={reply} />,
  );

  const handleDelete = () => {
    if (!sessionId || !sessionToken) return;

    deleteReply(reply.replyId, {
      sessionId,
      token: sessionToken,
    }).then(() => {
      updateReply(question.questionId, {
        ...reply,
        deleted: true,
      });
    });
  };

  const handleToggleLike = () => {
    if (!sessionId || !sessionToken || reply.deleted) return;

    postReplyLike(reply.replyId, {
      sessionId,
      token: sessionToken,
    }).then(() => {
      updateReply(question.questionId, {
        ...reply,
        likesCount: reply.likesCount + (reply.liked ? -1 : 1),
        liked: !reply.liked,
      });
    });
  };

  return (
    <>
      <div className='flex shrink basis-0 flex-col items-start justify-start gap-4 self-stretch px-12'>
        <div className='flex h-fit flex-col items-start justify-start gap-2 self-stretch rounded-md bg-gray-50 p-4'>
          <div className='flex h-fit flex-col items-start justify-start gap-1 self-stretch border-b border-gray-200 pb-2'>
            <div className='w-full text-base font-bold leading-normal text-black'>
              {reply.deleted ? '알 수 없음' : reply.nickname}
            </div>
            <Markdown className='prose prose-stone flex h-full w-full flex-col justify-start gap-3 text-base font-medium leading-normal text-black prose-img:rounded-md'>
              {reply.deleted ? '삭제된 답변입니다' : reply.body}
            </Markdown>
          </div>
          <div className='inline-flex w-full items-center justify-between'>
            <Button
              className='hover:bg-gray-200/50 hover:transition-all'
              onClick={handleToggleLike}
            >
              <div>
                <span className='text-sm font-medium text-black'>👍 </span>
                <span className='text-sm font-medium text-gray-500'>
                  {reply.likesCount}
                </span>
              </div>
            </Button>
            <div className='inline-flex items-center justify-start gap-2 px-2'>
              {reply.isOwner && !reply.deleted && (
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
      </div>
      {Modal}
    </>
  );
}

export default ReplyItem;
