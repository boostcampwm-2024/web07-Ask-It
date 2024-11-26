import { useQuery } from '@tanstack/react-query';

import { getSessions } from '@/features/session';

import { SessionRecord } from '@/components/my';

function MyPage() {
  const { data } = useQuery({ queryKey: ['/sessions'], queryFn: getSessions });

  const sessions = data?.sessionData;

  return (
    <div className='inline-flex h-full w-full items-center justify-center gap-4 overflow-hidden px-4 py-4 md:max-w-[1194px]'>
      <div className='inline-flex shrink grow basis-0 flex-col items-center justify-start self-stretch rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] items-center justify-between self-stretch border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>참여한 세션 기록</div>
          <div className='rounded-md px-3 py-2' />
        </div>
        <div className='flex shrink grow basis-0 flex-col items-start justify-start gap-4 self-stretch overflow-y-auto px-8 py-2'>
          {sessions?.map((session) => (
            <SessionRecord
              key={session.sessionId}
              session={{
                ...session,
                createdAt: new Date(
                  session.createdAt.year,
                  session.createdAt.month - 1,
                  session.createdAt.date,
                ).toISOString(),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
