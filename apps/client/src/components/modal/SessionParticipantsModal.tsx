import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { useModalContext } from '@/features/modal';

import { Button } from '@/components';
import Participant from '@/components/modal/Participant';

function SessionParticipantsModal() {
  const { closeModal } = useModalContext();

  const [selectedUserId, setSelectedUserId] = useState<number>();

  const participantList = [
    { id: 1, name: '최정민', isHost: false },
    { id: 2, name: '이상현', isHost: true },
    { id: 3, name: '유영재', isHost: false },
    { id: 4, name: '이지호', isHost: true },
  ];

  const selectedUser = participantList.find(({ id }) => id === selectedUserId);

  return (
    <div className='inline-flex flex-col items-center justify-center gap-2.5 rounded-lg bg-gray-50 p-8 shadow'>
      {selectedUser ? (
        <div className='flex h-[15dvh] w-full min-w-[25dvw] flex-col justify-center gap-2'>
          <div className='w-full text-center font-bold'>
            <span>
              <span className='text-indigo-600'>{selectedUser.name}</span>
              <span>님을</span>
            </span>
            <br />
            <span>
              {selectedUser.isHost
                ? '호스트를 해제하겠습니까?'
                : '호스트로 지정하겠습니까?'}
            </span>
          </div>
          <div className='mx-auto mt-4 inline-flex min-w-[22.5dvw] items-start justify-center gap-2.5'>
            <Button
              className='w-full bg-gray-500'
              onClick={() => setSelectedUserId(undefined)}
            >
              <div className='flex-grow text-sm font-medium text-white'>
                취소하기
              </div>
            </Button>
            <Button
              className='w-full bg-indigo-600 transition-colors duration-200'
              onClick={() => {
                // TODO: 호스트 지정 API 호출
              }}
            >
              <div className='flex-grow text-sm font-medium text-white'>
                지정하기
              </div>
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex h-[25dvh] w-full min-w-[25dvw] flex-col gap-2'>
          <div className='flex flex-row items-center justify-between border-b border-gray-200 pb-2'>
            <span className='text-lg font-bold'>세션 참여자 정보</span>
            <IoClose
              size={24}
              className='cursor-pointer text-rose-600 transition-transform duration-100 hover:scale-110'
              onClick={closeModal}
            />
          </div>
          <ol className='flex w-full flex-col gap-2 overflow-y-auto overflow-x-hidden'>
            {participantList.map(({ id, name, isHost }) => (
              <Participant
                name={name}
                isHost={isHost}
                onSelect={() => setSelectedUserId(id)}
              />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default SessionParticipantsModal;
