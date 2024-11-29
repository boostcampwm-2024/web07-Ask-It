import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { useModalContext } from '@/features/modal';
import {
  getSessionUsers,
  patchSessionHost,
  useSessionStore,
} from '@/features/session';
import { useToastStore } from '@/features/toast';

import { Button } from '@/components';
import Participant from '@/components/modal/Participant';

function SessionParticipantsModal() {
  const { closeModal } = useModalContext();

  const { addToast } = useToastStore();

  const {
    sessionUsers,
    sessionId,
    sessionToken,
    setSessionUsers,
    updateSessionUser,
    updateReplyIsHost,
  } = useSessionStore();

  const [selectedUserId, setSelectedUserId] = useState<number>();

  const selectedUser = sessionUsers.find(
    ({ userId }) => userId === selectedUserId,
  );

  const [searchQuery, setSearchQuery] = useState('');

  const { mutate: toggleHost, isPending: isToggleInProgress } = useMutation({
    mutationFn: (params: {
      userId: number;
      sessionId: string;
      token: string;
      isHost: boolean;
    }) =>
      patchSessionHost(params.userId, {
        token: params.token,
        sessionId: params.sessionId,
        isHost: params.isHost,
      }),
    onSuccess: (res) => {
      updateReplyIsHost(res.user.userId, res.user.isHost);
      updateSessionUser(res.user);
      addToast({
        type: 'SUCCESS',
        message: `${res.user.nickname}님을 호스트${res.user.isHost ? '로 지정' : '에서 해제'}했습니다.`,
        duration: 3000,
      });
    },
    onError: (error) => {
      if (!isAxiosError(error)) return;
      if (error.response?.status === 400) {
        addToast({
          type: 'ERROR',
          message: '자신의 권한을 변경하려는 요청은 허용되지 않습니다.',
          duration: 3000,
        });
      } else if (error.response?.status === 403) {
        addToast({
          type: 'ERROR',
          message: '세션 생성자만 권한을 수정할 수 있습니다.',
          duration: 3000,
        });
      }
    },
    onSettled: () => {
      setSelectedUserId(undefined);
    },
  });

  const handleToggleHost = () => {
    if (!selectedUser || !sessionId || !sessionToken || isToggleInProgress)
      return;

    toggleHost({
      userId: selectedUser.userId,
      sessionId,
      token: sessionToken,
      isHost: !selectedUser.isHost,
    });
  };

  useEffect(() => {
    if (sessionId && sessionToken)
      getSessionUsers({ sessionId, token: sessionToken })
        .then(({ users }) => {
          setSessionUsers(users);
        })
        .catch(console.error);
  }, [sessionId, sessionToken, setSessionUsers]);

  const users = sessionUsers.filter(({ nickname }) =>
    nickname.includes(searchQuery),
  );

  return (
    <div className='inline-flex flex-col items-center justify-center gap-2.5 rounded-lg bg-gray-50 p-8 shadow'>
      {selectedUser ? (
        <div className='flex h-[15dvh] min-w-[17.5dvw] flex-col justify-center gap-2'>
          <div className='w-full text-center font-bold'>
            <span>
              <span className='text-indigo-600'>{selectedUser.nickname}</span>
              <span>님을</span>
            </span>
            <br />
            <span>
              {selectedUser.isHost
                ? '호스트를 해제하겠습니까?'
                : '호스트로 지정하겠습니까?'}
            </span>
          </div>
          <div className='mx-auto mt-4 inline-flex w-full items-start justify-center gap-2.5'>
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
              onClick={handleToggleHost}
            >
              <div className='flex-grow text-sm font-medium text-white'>
                {selectedUser.isHost ? '해제하기' : '지정하기'}
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
          <div className='relative w-full'>
            <input
              type='text'
              value={searchQuery}
              placeholder='유저 이름을 검색하세요'
              className='w-full rounded border-gray-500 p-2 pr-8 text-sm font-medium text-gray-500 focus:outline-none'
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <IoClose
                size={20}
                className='absolute right-2 top-2 cursor-pointer text-gray-500 transition-all duration-100 hover:scale-110 hover:text-gray-700'
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>
          <ol className='flex w-full flex-col gap-2 overflow-y-auto overflow-x-hidden'>
            {users.map((user) => (
              <Participant
                key={user.userId}
                user={user}
                onSelect={() => setSelectedUserId(user.userId)}
              />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default SessionParticipantsModal;
