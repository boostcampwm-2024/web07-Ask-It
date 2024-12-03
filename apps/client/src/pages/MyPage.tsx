import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { getSessions } from '@/features/session';

import { Button } from '@/components';
import { SessionRecord } from '@/components/my';

function MyPage() {
  const [hideExpired, setHideExpired] = useState(true);

  const { data } = useQuery({ queryKey: ['/sessions'], queryFn: getSessions });

  const sessions = useMemo(() => {
    if (!data) return [];
    if (hideExpired) return data.sessionData.filter((session) => session.expired === false);
    return data.sessionData;
  }, [data, hideExpired]);

  return (
    <div className='inline-flex h-full w-full items-center justify-center gap-4 overflow-hidden px-4 py-4 md:max-w-[1194px]'>
      <div className='inline-flex shrink grow basis-0 flex-col items-center justify-start self-stretch rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] items-center justify-between self-stretch border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>참여한 세션 기록</div>
          <Button
            className={`transition-colors duration-200 ${hideExpired ? 'bg-emerald-100' : 'bg-red-100'}`}
            onClick={() => setHideExpired((prev) => !prev)}
          >
            <div className={`rounded-md text-xs font-medium ${hideExpired ? 'text-green-800' : 'text-red-600'}`}>
              만료된 세션 {hideExpired ? '보이기' : '숨기기'}
            </div>
          </Button>
        </div>
        <div className='flex shrink grow basis-0 flex-col items-start justify-start gap-4 self-stretch overflow-y-auto px-8 py-2'>
          {sessions.map((session) => (
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
