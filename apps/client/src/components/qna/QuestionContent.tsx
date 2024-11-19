import { QuestionDetail, QuestionList } from '@/components';
import { useQnAContext } from '@/features/session/qna';

function QuestionContent() {
  const { selectedQuestionId } = useQnAContext();

  return selectedQuestionId == null ? <QuestionList /> : <QuestionDetail />;
}

export default QuestionContent;
