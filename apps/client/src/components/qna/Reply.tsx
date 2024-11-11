import { Button } from '@/components';

interface ReplyProps {
  nickname: string;
  body: string;
  votes: number;
}

function Reply({ nickname, body, votes }: ReplyProps) {
  return (
    <div className='flex shrink grow basis-0 flex-col items-start justify-start gap-4 self-stretch px-12'>
      <div className='flex h-fit flex-col items-start justify-start gap-2 self-stretch rounded-md bg-gray-50 p-4'>
        <div className='flex h-fit flex-col items-start justify-start gap-1 self-stretch border-b border-gray-200 pb-2'>
          <div className='w-full text-base font-bold leading-normal text-black'>
            {nickname}
          </div>
          <div className='self-stretch text-sm font-medium leading-normal text-black'>
            {body}
          </div>
        </div>
        <div className='inline-flex items-center justify-start'>
          <Button className='hover:bg-gray-200/50 hover:transition-all'>
            <div>
              <span className='text-sm font-medium text-black'>👍 </span>
              <span className='text-sm font-medium text-gray-500'>{votes}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Reply;
