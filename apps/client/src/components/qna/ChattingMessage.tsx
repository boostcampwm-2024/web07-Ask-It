interface ChattingMessageProps {
  nickname: string;
  message: string;
}

function ChattingMessage({ nickname, message }: ChattingMessageProps) {
  return (
    <div className='inline-flex items-start justify-start gap-2 self-stretch p-2.5'>
      <span className='text-sm font-semibold text-indigo-600'>{nickname}</span>
      <span className='shrink grow basis-0 text-sm font-medium text-black'>
        {message}
      </span>
    </div>
  );
}

export default ChattingMessage;
