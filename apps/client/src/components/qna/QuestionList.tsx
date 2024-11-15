import { Button, CreateQuestionModal } from '@/components';
import Question from '@/components/qna/Question';
import { useModal } from '@/features/modal';
import { useQnAContext } from '@/features/session/qna';

function QuestionList() {
  const { Modal, openModal } = useModal(<CreateQuestionModal />);

  const { handleSelectQuestion } = useQnAContext();

  return (
    <>
      <div className='inline-flex h-full w-4/5 flex-grow flex-col items-center justify-start rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>질문 목록</div>
          <Button className='bg-indigo-600' onClick={openModal}>
            <div className='text-sm font-bold text-white'>질문하기</div>
          </Button>
        </div>
        <div className='inline-flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto px-8 py-4'>
          {/* TODO: 질문 목록으로 변경 필요 */}
          <Question
            body={
              'React와 Vue.js의 주요 차이점은 무엇인가요?\n' +
              '두 프레임워크의 성능과 학습 곡선에 대해 궁금합니다.'
            }
            votes={42}
            onSelect={() => {
              handleSelectQuestion(1);
            }}
            closed
          />
        </div>
      </div>
      {Modal}
    </>
  );
}

export default QuestionList;
