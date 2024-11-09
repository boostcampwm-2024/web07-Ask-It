import { Button, CreateSessionModal, FeatureCard } from '@/components';
import { useModal } from '@/features/modal';

function Home() {
  const { Modal: CreateSession, openModal: openCreateSessionModal } = useModal(
    <CreateSessionModal />,
  );

  return (
    <>
      <div className='flex h-full w-full flex-col'>
        <div className='inline-flex h-2/5 min-h-[327px] flex-col items-center justify-center gap-4 px-4 py-20 md:px-40'>
          <div className="self-stretch text-center font-['Pretendard'] text-2xl font-bold text-black sm:text-3xl md:text-[32px]">
            질문과 답변을 넘어,
            <br />
            함께 만드는 인사이트
          </div>
          <div className="self-stretch text-center font-['Pretendard'] text-base font-medium text-gray-600 sm:text-lg md:text-xl">
            실시간 Q&A와 소통을 위한 최적의 플랫폼
          </div>
          <Button className='bg-indigo-600' onClick={openCreateSessionModal}>
            <div className="font-['Pretendard'] text-base font-bold text-white">
              새로운 세션 만들기
            </div>
          </Button>
        </div>
        <div className='inline-flex h-full flex-col items-center justify-center gap-8 bg-white py-8 sm:h-3/5'>
          <div className='inline-flex h-fit w-2/3 flex-col items-start justify-center gap-8 sm:w-[536px] sm:flex-row'>
            <FeatureCard
              icon='💬'
              title='실시간 Q&A'
              description='마크다운과 이미지를 지원하는 풍부한 질문과 답변'
            />
            <FeatureCard
              icon='👥'
              title='채팅 토론'
              description='실시간 채팅으로 즉각적인 소통과 토론'
            />
          </div>
          <div className='inline-flex h-fit w-2/3 flex-col items-start justify-center gap-8 sm:w-[536px] sm:flex-row'>
            <FeatureCard
              icon='🔒'
              title='권한 관리'
              description='연사자와 참가자를 위한 세분화된 권한 시스템'
            />
            <FeatureCard
              icon='📦'
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

export default Home;
