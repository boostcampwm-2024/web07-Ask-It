import { useEffect, useRef, useState } from 'react';

import ChattingMessage from '@/components/qna/ChattingMessage';
import { useSessionStore } from '@/features/session';
import { useSocket } from '@/features/socket';

function ChattingList() {
  const { chatting } = useSessionStore();

  const [message, setMessage] = useState<string>('');
  const [userScrolled, setUserScrolled] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  const socket = useSocket();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAtBottom = () => {
    if (!messagesEndRef.current) return true;
    const { scrollHeight, scrollTop, clientHeight } = messagesEndRef.current;
    return Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setIsProgrammaticScroll(true);
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth',
      });
      setUserScrolled(false);
      setIsScrolledToBottom(true);
      setIsProgrammaticScroll(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!messagesEndRef.current || isProgrammaticScroll) return;
      setUserScrolled(true);
      setIsScrolledToBottom(isAtBottom());
    };

    const handleScrollEnd = () => {
      if (isProgrammaticScroll) setIsProgrammaticScroll(false);
    };

    const messageContainer = messagesEndRef.current;
    messageContainer?.addEventListener('scroll', handleScroll);
    messageContainer?.addEventListener('scrollend', handleScrollEnd);

    return () => {
      messageContainer?.removeEventListener('scroll', handleScroll);
      messageContainer?.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [chatting, isProgrammaticScroll]);

  useEffect(() => {
    if (messagesEndRef.current && (!userScrolled || isScrolledToBottom)) {
      setIsProgrammaticScroll(true);
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatting, userScrolled, isScrolledToBottom]);

  return (
    <div className='inline-flex h-full w-1/5 min-w-[240px] flex-col items-center justify-start rounded-lg bg-white shadow'>
      <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-4 py-3'>
        <div className='shrink grow basis-0 text-lg font-medium text-black'>
          실시간 채팅
        </div>
        {/* TODO: 백엔드 추가 되면 진행 */}
        {/* <div className='flex items-center justify-center gap-2.5 rounded bg-green-100 px-2 py-1'>
          <p className='text-[10px] font-medium text-green-800'>123명 참여중</p>
        </div> */}
      </div>

      <div
        className='inline-flex h-full w-full flex-col items-start justify-start overflow-y-auto break-words p-2.5 scrollbar-hide'
        ref={messagesEndRef}
      >
        {chatting.map((chat) => (
          <ChattingMessage key={chat.chattingId} chat={chat} />
        ))}
      </div>

      <div className='inline-flex h-[75px] w-full items-center justify-center gap-2.5 border-t border-gray-200 bg-gray-50 p-4'>
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

      {userScrolled && !isScrolledToBottom && (
        <button
          type='button'
          onClick={scrollToBottom}
          className='absolute bottom-[10%] rounded-full bg-indigo-500 p-2 text-white shadow-lg transition-all hover:bg-indigo-600'
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
    </div>
  );
}

export default ChattingList;
