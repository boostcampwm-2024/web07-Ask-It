import { SessionRecord } from '@/components/my';

function MyPage() {
  return (
    <div className='inline-flex h-full w-full items-center justify-center gap-4 overflow-hidden px-4 py-4 md:max-w-[1194px]'>
      <div className='inline-flex shrink grow basis-0 flex-col items-center justify-start gap-4 self-stretch rounded-lg bg-white shadow'>
        <div className='inline-flex items-center justify-between self-stretch border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>참여한 세션 기록</div>
          <div className='rounded-md px-3 py-2' />
        </div>
        <div className='flex shrink grow basis-0 flex-col items-start justify-start gap-4 self-stretch overflow-y-auto px-8 pb-4'>
          <SessionRecord
            sessionName='못말리는 장난꾸러기의 세션'
            createdAt={new Date()}
            closed
          />
          <SessionRecord
            sessionName='못말리는 장난꾸러기의 세션'
            createdAt={new Date()}
            closed={false}
          />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
