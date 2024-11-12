import { Button } from '@/components';
import Reply from '@/components/qna/Reply';
import { useQnAContext } from '@/features/session/qna';

function QuestionDetail() {
  const { selectedQuestion, handleSelectQuestion } = useQnAContext();

  if (selectedQuestion == null) return null;

  return (
    <div className='inline-flex h-full w-4/5 flex-grow flex-col items-center justify-start rounded-lg bg-white shadow'>
      <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-8 py-2'>
        <Button
          className='hover:bg-gray-200 hover:transition-all'
          onClick={() => handleSelectQuestion(null)}
        >
          <div className='text-lg font-medium text-black'> ← 질문 목록</div>
        </Button>
      </div>

      <div className='inline-flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto'>
        <div className='flex h-fit flex-col items-start justify-center gap-2.5 self-stretch border-b border-gray-200/50 px-12 py-4'>
          <div className="' self-stretch text-base font-medium leading-normal text-black">
            {/* TODO: 질문 글 본문으로 변경 */}
            React와 Vue.js의 주요 차이점은 무엇인가요? 두 프레임워크의 성능과
            학습 곡선에 대해 궁금합니다.
          </div>
        </div>

        {/* TODO: 답변 목록으로 변환 필요 */}
        <Reply
          nickname='연사자'
          body='React는 더 유연한 접근 방식을 제공하며, Vue는 더 직관적인 문법을 가지고 있습니다.'
          votes={42}
        />
      </div>
    </div>
  );
}

export default QuestionDetail;
