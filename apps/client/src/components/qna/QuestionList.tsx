import { isAxiosError } from 'axios';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { GrValidate } from 'react-icons/gr';
import { IoClose, IoShareSocialOutline } from 'react-icons/io5';

import { useModal } from '@/features/modal';
import { postSessionTerminate, useSessionStore } from '@/features/session';
import { useToastStore } from '@/features/toast';

import {
  Button,
  CreateQuestionModal,
  SessionParticipantsModal,
} from '@/components';
import SessionTerminateModal from '@/components/modal/SessionTerminateModal';
import QuestionSection from '@/components/qna/QuestionSection';
import SessionSettingsDropdown from '@/components/qna/SessionSettingsDropdown';

function QuestionList() {
  const {
    isHost,
    expired,
    questions,
    sessionId,
    sessionTitle,
    sessionToken,
    setExpired,
    setSelectedQuestionId,
  } = useSessionStore();

  const { addToast } = useToastStore();

  const { Modal: CreateQuestion, openModal: openCreateQuestionModal } =
    useModal(<CreateQuestionModal />);

  const {
    Modal: SessionParticipants,
    openModal: openSessionParticipantsModal,
  } = useModal(<SessionParticipantsModal />);

  const { Modal: SessionTerminate, openModal: openSessionTerminateModal } =
    useModal(
      <SessionTerminateModal
        onConfirm={() => {
          if (!sessionId || !sessionToken) return;

          postSessionTerminate({ sessionId, token: sessionToken })
            .then((response) => {
              if (response.expired) {
                setExpired(true);
                addToast({
                  type: 'SUCCESS',
                  message: '세션이 종료되었습니다',
                  duration: 3000,
                });
              }
            })
            .catch((err) => {
              if (isAxiosError(err) && err.response?.status === 403) {
                addToast({
                  type: 'ERROR',
                  message: '세션 생성자만 세션을 종료할 수 있습니다',
                  duration: 3000,
                });
              }
            });
        }}
      />,
    );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const sessionButtons = [
    {
      icon: <IoShareSocialOutline />,
      label: '공유',
      onClick: async () => {
        const shareUrl = `${window.location.origin}/session/${sessionId}`;

        try {
          await navigator.clipboard.writeText(shareUrl);
          addToast({
            type: 'SUCCESS',
            message: '세션 링크가 클립보드에 복사되었습니다',
            duration: 3000,
          });
        } catch (err) {
          addToast({
            type: 'ERROR',
            message: '링크 복사에 실패했습니다',
            duration: 3000,
          });
        }
      },
    },
    {
      icon: <GrValidate />,
      label: '호스트 설정',
      onClick: () => openSessionParticipantsModal(),
    },
    {
      icon: <IoClose />,
      label: '세션 종료',
      onClick: () => openSessionTerminateModal(),
    },
  ];

  return (
    <>
      <div className='inline-flex h-full w-4/5 flex-grow flex-col items-center justify-start rounded-lg bg-white shadow'>
        <div className='inline-flex h-[54px] w-full items-center justify-between border-b border-gray-200 px-8 py-2'>
          <div className='text-lg font-medium text-black'>{sessionTitle}</div>
          {!expired && (
            <div className='flex flex-row gap-2'>
              <div className='relative'>
                {isHost && (
                  <Button
                    ref={buttonRef}
                    className='hover:bg-gray-200 hover:transition-all'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <p className='text-sm font-bold text-black'>설정</p>
                  </Button>
                )}
                {isDropdownOpen && (
                  <SessionSettingsDropdown
                    buttons={sessionButtons}
                    onClose={() => setIsDropdownOpen(false)}
                    triggerRef={buttonRef}
                  />
                )}
              </div>
              <Button
                className='bg-indigo-600'
                onClick={openCreateQuestionModal}
              >
                <div className='text-sm font-bold text-white'>질문하기</div>
              </Button>
            </div>
          )}
        </div>
        <motion.div className='inline-flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto px-8 py-4'>
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
      {CreateQuestion}
      {SessionParticipants}
      {SessionTerminate}
    </>
  );
}

export default QuestionList;
