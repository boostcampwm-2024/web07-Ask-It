import { useEffect, useRef, useState } from 'react';

import ChattingMessage from '@/components/qna/ChattingMessage';

function ChattingList() {
  const [message, setMessage] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className='inline-flex h-full w-1/5 min-w-[240px] flex-col items-center justify-start rounded-lg bg-white shadow'>
      <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-4 py-3'>
        <div className='shrink grow basis-0 text-lg font-medium text-black'>
          실시간 채팅
        </div>
        <div className='flex items-center justify-center gap-2.5 rounded bg-green-100 px-2 py-1'>
          <p className='text-[10px] font-medium text-green-800'>123명 참여중</p>
        </div>
      </div>

      <div
        className='inline-flex h-full w-full flex-col items-start justify-start overflow-y-auto p-2.5'
        ref={messagesEndRef}
      >
        {/* TODO: 채팅 메세지 목록으로 변환 필요 */}
        <ChattingMessage nickname='장난꾸러기' message='1' />
        <ChattingMessage nickname='장난꾸러기' message='2' />
        <ChattingMessage nickname='장난꾸러기' message='3' />
        <ChattingMessage nickname='장난꾸러기' message='4' />
        <ChattingMessage nickname='장난꾸러기' message='5' />
        <ChattingMessage nickname='장난꾸러기' message='6' />
        <ChattingMessage nickname='장난꾸러기' message='7' />
        <ChattingMessage nickname='장난꾸러기' message='8' />
        <ChattingMessage nickname='장난꾸러기' message='9' />
      </div>

      <div className='inline-flex h-[75px] w-full items-center justify-center gap-2.5 border-t border-gray-200 bg-gray-50 p-4'>
        <div className='flex w-full items-center justify-center self-stretch rounded-md border border-gray-200 bg-white p-3'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setMessage('');
              }
            }}
            className='w-full text-sm font-medium text-gray-500 focus:outline-none'
            placeholder='채팅 메시지를 입력해주세요'
          />
        </div>
      </div>
    </div>
  );
}

export default ChattingList;
