import { Button } from '@/components';

interface QuestionProps {
  body: string;
  votes: number;
  closed: boolean;
  onSelect: () => void;
}

function Question({ body, votes, closed, onSelect }: QuestionProps) {
  return (
    <div className='inline-flex h-fit w-full flex-col items-start justify-start gap-4 rounded-lg border border-gray-200 bg-white px-4 py-2'>
      <div className='flex h-fit flex-col items-start justify-start gap-2 self-stretch border-b border-gray-200 px-2.5 pb-4 pt-2.5'>
        <div className='inline-flex items-start justify-between gap-4 self-stretch'>
          <div className='text-base font-medium leading-normal text-black'>
            {body}
          </div>
          <div className='flex shrink-0 items-center justify-center gap-2.5 rounded bg-green-100 px-2 py-1'>
            {closed && (
              <div className='text-base font-medium text-green-800'>✓</div>
            )}
          </div>
        </div>
      </div>
      <div className='inline-flex items-center justify-start gap-2'>
        <Button className='hover:bg-gray-200/50 hover:transition-all'>
          <div>
            <span className='text-sm font-medium text-black'>👍 </span>
            <span className='text-sm font-medium text-gray-500'>{votes}</span>
          </div>
        </Button>
        <Button className='hover:bg-gray-200/50 hover:transition-all'>
          <div>
            <span className='text-sm font-medium text-black'>📌 </span>
            <span className='text-sm font-medium text-gray-500'>Pin</span>
          </div>
        </Button>
        <Button
          className='hover:bg-gray-200/50 hover:transition-all'
          onClick={onSelect}
        >
          <div className='text-sm font-medium text-indigo-600'>💬 답글</div>
        </Button>
      </div>
    </div>
  );
}

export default Question;
