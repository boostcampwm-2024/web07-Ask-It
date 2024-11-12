import { QuestionDetail, QuestionList } from '@/components';
import { useQnAContext } from '@/features/session/qna';

function QuestionContent() {
  const { selectedQuestion } = useQnAContext();

  return selectedQuestion == null ? <QuestionList /> : <QuestionDetail />;
}

export default QuestionContent;
