import { GoArchive, GoPeople } from 'react-icons/go';
import { IoChatboxEllipsesOutline, IoLockClosedOutline } from 'react-icons/io5';

import { useAuthStore } from '@/features/auth';
import { useModal } from '@/features/modal';

import { Button, CreateSessionModal, FeatureCard } from '@/components';

function HomePage() {
  const { isLogin } = useAuthStore();

  const { Modal: CreateSession, openModal: openCreateSessionModal } = useModal(<CreateSessionModal />);

  return (
    <>
      <div className='flex h-full w-full flex-col overflow-y-auto'>
        <div className='inline-flex h-2/5 min-h-[327px] flex-col items-center justify-center gap-4 px-4 md:px-40'>
          <div className='self-stretch text-center text-2xl font-bold text-black sm:text-3xl md:text-[32px]'>
            질문과 답변을 넘어,
            <br />
            함께 만드는 인사이트
          </div>
          <div className='self-stretch text-center text-base font-medium text-gray-600 sm:text-lg md:text-xl'>
            실시간 Q&A와 소통을 위한 최적의 플랫폼
          </div>
          <div className='group relative flex'>
            <Button
              className={`${isLogin() ? 'bg-indigo-600' : 'cursor-not-allowed bg-indigo-300'}`}
              onClick={isLogin() ? openCreateSessionModal : undefined}
            >
              <div className='text-base font-bold text-white'>새로운 세션 만들기</div>
            </Button>
            {isLogin() ? undefined : (
              <span className='absolute top-1/2 flex w-full translate-y-full items-center justify-center rounded-md bg-indigo-600 p-1 text-sm font-bold text-white opacity-0 transition-opacity group-hover:opacity-100'>
                로그인 후 이용 가능
              </span>
            )}
          </div>
        </div>
        <div className='inline-flex flex-grow flex-col items-center justify-center gap-8 bg-white py-8'>
          <div className='inline-flex h-fit w-2/3 flex-col items-start justify-center gap-8 sm:w-[536px] sm:flex-row'>
            <FeatureCard
              icon={<GoPeople size={32} />}
              title='실시간 Q&A'
              description='연사자와 익명의 청중의 실시간 응답'
            />
            <FeatureCard
              icon={<IoChatboxEllipsesOutline size={32} />}
              title='채팅'
              description='실시간 채팅으로 즉각적인 소통'
            />
          </div>
          <div className='inline-flex h-fit w-2/3 flex-col items-start justify-center gap-8 sm:w-[536px] sm:flex-row'>
            <FeatureCard
              icon={<IoLockClosedOutline size={32} />}
              title='권한 관리'
              description='연사자와 참가자를 위한 세분화된 권한 시스템'
            />
            <FeatureCard
              icon={<GoArchive size={32} />}
              title='아카이빙'
              description='세션 내용 보존과 효율적인 자료화'
            />
          </div>
        </div>
      </div>
      {CreateSession}
    </>
  );
}

export default HomePage;
