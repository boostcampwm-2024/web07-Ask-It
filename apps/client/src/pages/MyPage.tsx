import { useQuery } from '@tanstack/react-query';

import { SessionRecord } from '@/components/my';
import { getSessions } from '@/features/session';

function MyPage() {
  const { data } = useQuery({ queryKey: ['/sessions'], queryFn: getSessions });

  const sessions = data?.data.sessionData;

  return (
    <div className='inline-flex h-full w-full items-center justify-center gap-4 overflow-hidden px-4 py-4 md:max-w-[1194px]'>
      <div className='inline-flex shrink grow basis-0 flex-col items-center justify-start gap-4 self-stretch rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] items-center justify-between self-stretch border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>참여한 세션 기록</div>
          <div className='rounded-md px-3 py-2' />
        </div>
        <div className='flex shrink grow basis-0 flex-col items-start justify-start gap-4 self-stretch overflow-y-auto px-8 py-2'>
          {sessions?.map((session) => (
            <SessionRecord
              key={session.session_id}
              sessionId={session.session_id}
              sessionName={session.title}
              closed={session.expired}
              createdAt={
                new Date(
                  session.created_at.year,
                  session.created_at.month - 1,
                  session.created_at.date,
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
