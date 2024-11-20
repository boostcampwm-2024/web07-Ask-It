import { AnimatePresence, motion, Variants } from 'motion/react';
import { useState } from 'react';

import QuestionDivider from '@/components/qna/QuestionDivider';
import QuestionItem from '@/components/qna/QuestionItem';
import { Question } from '@/features/session/qna';

const itemVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  hover: {
    scale: 1.02,
    backgroundColor: '#f3f4f6',
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

const sectionVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
    },
  },
};

interface QuestionSectionProps {
  title: string;
  questions: Question[];
  onQuestionSelect: (questionId: number) => void;
}

function QuestionSection({
  title,
  questions,
  onQuestionSelect,
}: QuestionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (questions.length === 0) return null;

  return (
    <motion.div
      className='w-full'
      key={`${title}-section`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <QuestionDivider
        description={title}
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className='flex flex-col gap-4 overflow-hidden'
            initial='closed'
            animate='open'
            exit='closed'
            variants={sectionVariants}
          >
            {questions.map((question) => (
              <motion.div
                key={question.questionId}
                variants={itemVariants}
                layout
              >
                <QuestionItem
                  question={question}
                  onQuestionSelect={() => onQuestionSelect(question.questionId)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuestionSection;
