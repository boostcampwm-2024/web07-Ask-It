import { FiEdit2 } from 'react-icons/fi';
import { GrClose, GrLike, GrLikeFill, GrValidate } from 'react-icons/gr';
import Markdown from 'react-markdown';

import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import {
  deleteReply,
  postReplyLike,
  Question,
  Reply,
} from '@/features/session/qna';
import { useToastStore } from '@/features/toast';

import { Button, CreateReplyModal } from '@/components';

interface ReplyItemProps {
  question: Question;
  reply: Reply;
}

function ReplyItem({ question, reply }: ReplyItemProps) {
  const { addToast } = useToastStore();

  const { sessionId, sessionToken, expired, updateReply } = useSessionStore();

  const { Modal, openModal } = useModal(
    <CreateReplyModal question={question} reply={reply} />,
  );

  const handleDelete = () => {
    if (expired || !sessionId || !sessionToken) return;

    deleteReply(reply.replyId, {
      sessionId,
      token: sessionToken,
    }).then(() => {
      addToast({
        type: 'SUCCESS',
        message: '답변이 성공적으로 삭제되었습니다.',
        duration: 3000,
      });
      updateReply(question.questionId, {
        ...reply,
        deleted: true,
      });
    });
  };

  const handleToggleLike = () => {
    if (expired || !sessionId || !sessionToken || reply.deleted) return;

    postReplyLike(reply.replyId, {
      sessionId,
      token: sessionToken,
    }).then((res) => {
      addToast({
        type: 'SUCCESS',
        message: reply.liked
          ? '좋아요를 취소했습니다.'
          : '답변에 좋아요를 눌렀습니다.',
        duration: 3000,
      });
      updateReply(question.questionId, {
        ...reply,
        ...res,
      });
    });
  };

  return (
    <>
      <div className='flex shrink basis-0 flex-col items-start justify-start gap-4 self-stretch px-12'>
        <div className='flex h-fit flex-col items-start justify-start gap-2 self-stretch rounded-md bg-gray-50 p-4'>
          <div className='flex h-fit flex-col items-start justify-start gap-1 self-stretch border-b border-gray-200 pb-2'>
            <div className='flex flex-row items-center gap-1'>
              {!reply.deleted && reply.isHost && <GrValidate size={18} />}
              <span className='w-full text-base font-bold leading-normal text-black'>
                {reply.deleted ? '알 수 없음' : reply.nickname}
              </span>
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
              <div className='flex flex-row items-center gap-2 text-sm font-medium text-gray-500'>
                {reply.liked ? (
                  <GrLikeFill
                    style={{
                      fill: 'rgb(165 180 252)',
                    }}
                  />
                ) : (
                  <GrLike />
                )}
                <span>{reply.likesCount}</span>
              </div>
            </Button>
            <div className='inline-flex items-center justify-start gap-2 px-2'>
              {!expired && reply.isOwner && !reply.deleted && (
                <>
                  <Button
                    className='bg-gray-200/25 hover:bg-gray-200/50 hover:transition-all'
                    onClick={openModal}
                  >
                    <FiEdit2 />
                  </Button>
                  <Button
                    className='bg-red-200/25 text-red-600 hover:bg-red-200/50 hover:transition-all'
                    onClick={handleDelete}
                  >
                    <GrClose />
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
