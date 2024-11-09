import { Button, SignInModal, SignUpModal } from '@/components';
import { useModal } from '@/features/modal';

function Header() {
  const { Modal: SignUp, openModal: openSignUpModal } = useModal(
    <SignUpModal />,
  );

  const { Modal: SignIn, openModal: openSignInModal } = useModal(
    <SignInModal />,
  );

  return (
    <>
      <div className='h-16 w-full bg-white px-4 py-4 shadow'>
        <div className='mx-auto flex h-full w-full max-w-[1194px] items-center justify-between px-4'>
          <button
            className="font-['Pretendard'] text-2xl font-bold text-indigo-600"
            type='button'
          >
            Ask-It
          </button>
          <div className='flex items-center justify-center gap-2.5'>
            <Button
              className='hover:bg-gray-200 hover:text-white hover:transition-all'
              onClick={openSignInModal}
            >
              <p className="font-['Pretendard'] text-base font-bold text-black">
                로그인
              </p>
            </Button>
            <Button className='bg-indigo-600' onClick={openSignUpModal}>
              <p className="font-['Pretendard'] text-base font-bold text-white">
                회원 가입
              </p>
            </Button>
          </div>
        </div>
      </div>
      {SignUp}
      {SignIn}
    </>
  );
}

export default Header;
