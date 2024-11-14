import { Link, useNavigate } from '@tanstack/react-router';

import { Button, SignInModal, SignUpModal } from '@/components';
import { logout, useAuthStore } from '@/features/auth';
import { useModal } from '@/features/modal';

function Header() {
  const { isLogin, clearAccessToken } = useAuthStore();

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
    });

  return (
    <>
      <div className='h-16 w-full bg-white px-4 py-4 shadow'>
        <div className='mx-auto flex h-full w-full max-w-[1194px] items-center justify-between px-4'>
          <Link to='/' className='text-2xl font-bold text-indigo-600'>
            Ask-It
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
