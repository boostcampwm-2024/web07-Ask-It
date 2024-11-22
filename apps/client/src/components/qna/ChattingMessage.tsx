import { Chat } from '@/features/session/chatting';

interface ChattingMessageProps {
  chat: Chat;
}

function ChattingMessage({
  chat: { nickname, content },
}: ChattingMessageProps) {
  return (
    <div className='inline-flex flex-col items-start justify-start gap-1 self-stretch p-2.5'>
      <span className='flex-shrink-0 text-sm font-semibold text-indigo-600'>
        {nickname}
      </span>
      <span className='shrink grow basis-0 break-all text-sm font-medium text-black'>
        {content}
      </span>
    </div>
  );
}

export default ChattingMessage;
