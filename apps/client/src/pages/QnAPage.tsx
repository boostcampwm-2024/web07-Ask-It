import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { ChattingList } from '@/components';
import QuestionContent from '@/components/qna/QuestionContent';
import { getSessionToken } from '@/features/session';
import { QnAContextProvider } from '@/features/session/qna';

function QnAPage() {
  const sessionId = useParams({
    from: '/session/$sessionId',
    select: (params) => params.sessionId,
    strict: true,
  });

  const { data: token } = useQuery({
    queryKey: ['/sessions-auth', sessionId],
    queryFn: () => getSessionToken(sessionId),
  });

  console.log(token);

  return (
    <div className='flex h-full w-full items-center justify-center gap-4 px-4 py-4 md:max-w-[1194px]'>
      <QnAContextProvider>
        <QuestionContent />
      </QnAContextProvider>
      <ChattingList />
    </div>
  );
}

export default QnAPage;
