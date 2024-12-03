import { Link } from '@tanstack/react-router';

import { Session } from '@/features/session/session.type';

import { formatDate } from '@/shared';

interface SessionRecordProps {
  session: Session;
}

function SessionRecord({ session }: SessionRecordProps) {
  return (
    <div className='flex h-fit flex-col items-start justify-start gap-4 self-stretch border-b border-gray-200 px-2.5 pb-4 pt-2.5'>
      <div className='flex h-fit flex-col items-start justify-center gap-2.5 self-stretch'>
        {session.expired ? (
          <div className='inline-flex items-center justify-center gap-2.5 rounded bg-green-100 px-2 py-1'>
            <div className='text-base font-medium text-green-800'>만료된 세션</div>
          </div>
        ) : (
          <div className='inline-flex items-center justify-center gap-2.5 rounded bg-blue-100 px-2 py-1'>
            <div className='text-base font-medium text-blue-800'>진행 중인 세션</div>
          </div>
        )}
      </div>
      <div className='inline-flex items-start justify-between self-stretch px-1'>
        <Link to='/session/$sessionId' params={{ sessionId: session.sessionId }}>
          <div className='text-base font-medium leading-normal text-black'>{session.title}</div>
        </Link>
        <div className='flex items-center justify-center gap-2.5 rounded px-2 py-1'>
          <div className='text-base font-medium text-gray-500'>{formatDate(new Date(session.createdAt))}</div>
        </div>
      </div>
    </div>
  );
}

export default SessionRecord;
