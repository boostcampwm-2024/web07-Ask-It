import { Link, useNavigate } from '@tanstack/react-router';

import { logout, useAuthStore } from '@/features/auth';
import { useModal } from '@/features/modal';
import { useToastStore } from '@/features/toast';

import { Button, SignInModal, SignUpModal } from '@/components';

function Header() {
  const { isLogin, clearAuthInformation: clearAccessToken } = useAuthStore();

  const addToast = useToastStore((state) => state.addToast);

  const { Modal: SignUp, openModal: openSignUpModal } = useModal(
    <SignUpModal />,
  );

  const { Modal: SignIn, openModal: openSignInModal } = useModal(
    <SignInModal />,
  );

  const navigate = useNavigate();

  const handleLogout = () =>
    logout().then(() => {
      clearAccessToken();
      navigate({ to: '/' });
      addToast({
        type: 'SUCCESS',
        message: '로그아웃 되었습니다.',
        duration: 3000,
      });
    });

  return (
    <>
      <div className='h-16 w-full bg-white px-4 py-4 shadow'>
        <div className='mx-auto flex h-full w-full max-w-[1194px] items-center justify-between px-4'>
          <Link to='/' className='font-header text-2xl'>
            <span className='text-indigo-600'>A</span>
            <span className='text-black'>sk-It</span>
          </Link>
          <div className='flex items-center justify-center gap-2.5'>
            <Button
              className='hover:bg-gray-200 hover:text-white hover:transition-all'
              onClick={isLogin() ? handleLogout : openSignInModal}
            >
              <p className='text-base font-bold text-black'>
                {isLogin() ? '로그아웃' : '로그인'}
              </p>
            </Button>
            <Button
              className='bg-indigo-600'
              onClick={
                isLogin() ? () => navigate({ to: '/my' }) : openSignUpModal
              }
            >
              <p className='text-base font-bold text-white'>
                {isLogin() ? '세션 기록' : '회원가입'}
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
