import { motion } from 'motion/react';

import { useModal } from '@/features/modal';
import { useSessionStore } from '@/features/session';

import { Button, CreateQuestionModal } from '@/components';
import QuestionSection from '@/components/qna/QuestionSection';

function QuestionList() {
  const { sessionTitle, expired, questions, setSelectedQuestionId } =
    useSessionStore();

  const { Modal, openModal } = useModal(<CreateQuestionModal />);

  const sections = [
    {
      title: '고정된 질문',
      initialOpen: true,
      questions: questions
        .filter((question) => question.pinned && !question.closed)
        .sort((a, b) => b.likesCount - a.likesCount),
    },
    {
      title: '질문',
      initialOpen: true,
      questions: questions
        .filter((question) => !question.pinned && !question.closed)
        .sort((a, b) => b.likesCount - a.likesCount),
    },
    {
      title: '답변 완료된 질문',
      initialOpen: false,
      questions: questions
        .filter((question) => question.closed)
        .sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return b.likesCount - a.likesCount;
        }),
    },
  ];

  return (
    <>
      <div className='inline-flex h-full w-4/5 flex-grow flex-col items-center justify-start rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>{sessionTitle}</div>
          {!expired && (
            <Button className='bg-indigo-600' onClick={openModal}>
              <div className='text-sm font-bold text-white'>질문하기</div>
            </Button>
          )}
        </div>
        <motion.div className='inline-flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto px-8 py-4 scrollbar-hide'>
          {sections.map((section) => (
            <QuestionSection
              key={section.title}
              title={section.title}
              initialOpen={section.initialOpen}
              questions={section.questions}
              onQuestionSelect={setSelectedQuestionId}
            />
          ))}
        </motion.div>
      </div>
      {Modal}
    </>
  );
}

export default QuestionList;
