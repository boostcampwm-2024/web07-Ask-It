import { ChattingList } from '@/components';
import QuestionContent from '@/components/qna/QuestionContent';
import { QnAContextProvider } from '@/features/session/qna';

function QnAPage() {
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
