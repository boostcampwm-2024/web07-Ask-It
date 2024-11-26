import { useCallback, useEffect, useRef, useState } from 'react';

import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';
import { useSocket } from '@/features/socket';

import { SessionParticipantsModal } from '@/components';
import Button from '@/components/Button';
import ChattingMessage from '@/components/qna/ChattingMessage';

function ChattingList() {
  const { chatting } = useSessionStore();

  const { Modal, openModal } = useModal(<SessionParticipantsModal />);

  const [message, setMessage] = useState('');
  const [isBottom, setIsBottom] = useState(true);
  const userScrolling = useRef(false);
  const autoScrolling = useRef(false);

  const socket = useSocket();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = useCallback(() => {
    if (messagesEndRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = messagesEndRef.current;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
      setIsBottom(isAtBottom);

      if (isAtBottom) userScrolling.current = false;
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      userScrolling.current = false;
      autoScrolling.current = true;
      setIsBottom(true);
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'instant',
      });
      autoScrolling.current = false;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      userScrolling.current = true;
      checkScrollPosition();
    };

    const messageContainer = messagesEndRef.current;
    messageContainer?.addEventListener('scroll', handleScroll);

    return () => {
      messageContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [autoScrolling, checkScrollPosition]);

  useEffect(() => {
    if (isBottom && !userScrolling.current) {
      scrollToBottom();
    }
  }, [chatting, isBottom]);

  return (
    <>
      <div className='inline-flex h-full w-1/5 min-w-[240px] flex-col items-center justify-start rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-4 py-3'>
          <div className='shrink grow basis-0 text-lg font-medium text-black'>
            실시간 채팅
          </div>
          <Button
            className='max-w-[100px] overflow-x-auto whitespace-nowrap bg-green-100 px-2 py-1 transition-colors duration-150 scrollbar-hide hover:bg-green-200'
            onClick={openModal}
          >
            <p className='text-[10px] font-medium text-green-800'>
              123123123명 참여중
            </p>
          </Button>
        </div>

        <div
          className='inline-flex h-full w-full flex-col items-start justify-start overflow-y-auto break-words p-2.5 scrollbar-hide'
          ref={messagesEndRef}
        >
          {chatting.map((chat) => (
            <ChattingMessage key={chat.chattingId} chat={chat} />
          ))}
        </div>

        <div className='relative inline-flex h-[75px] w-full items-center justify-center gap-2.5 border-t border-gray-200 bg-gray-50 p-4'>
          {!isBottom && userScrolling.current && (
            <button
              type='button'
              onClick={scrollToBottom}
              className='absolute bottom-[110%] rounded-full bg-indigo-500 p-2 text-white shadow-lg transition-all hover:bg-indigo-600'
              aria-label='맨 아래로 스크롤'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          )}
          <div className='flex w-full items-center justify-center self-stretch rounded-md border border-gray-200 bg-white p-3'>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.nativeEvent.isComposing &&
                  message.trim().length
                ) {
                  socket?.sendChatMessage(message);
                  setMessage('');
                }
              }}
              className='w-full text-sm font-medium text-gray-500 focus:outline-none'
              placeholder='채팅 메시지를 입력해주세요'
            />
          </div>
        </div>
      </div>
      {Modal}
    </>
  );
}

export default ChattingList;
