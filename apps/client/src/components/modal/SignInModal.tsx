import Button from '../Button';

import InputField from '@/components/modal/InputField';
import Modal from '@/components/modal/Modal';
import { useSignInForm } from '@/features/auth';
import { useModalContext } from '@/features/modal';
import { useToastStore } from '@/features/toast';

function SignInModal() {
  const addToast = useToastStore((state) => state.addToast);

  const { closeModal } = useModalContext();

  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoginEnabled,
    handleLogin,
    loginFailed,
  } = useSignInForm();

  const login = () =>
    isLoginEnabled &&
    handleLogin().then(() => {
      closeModal();
      addToast({
        type: 'SUCCESS',
        message: '로그인 되었습니다.',
        duration: 3000,
      });
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      login();
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <Modal>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <p className='text-2xl font-bold text-indigo-600'>Ask-It</p>
        <InputField
          label='이메일'
          type='email'
          value={email}
          onKeyDown={handleKeyDown}
          onChange={setEmail}
          placeholder='example@gmail.com'
        />
        <InputField
          label='비밀번호'
          type='password'
          value={password}
          onKeyDown={handleKeyDown}
          onChange={setPassword}
          placeholder='비밀번호를 입력해주세요'
          validationStatus={loginFailed}
        />
        <div className='mt-4 inline-flex items-start justify-start gap-2.5'>
          <Button
            className={`transition-colors duration-200 ${isLoginEnabled ? 'bg-indigo-600' : 'cursor-not-allowed bg-indigo-300'}`}
            onClick={login}
          >
            <div className='w-[150px] text-sm font-medium text-white'>
              로그인
            </div>
          </Button>
          <Button className='bg-gray-500' onClick={closeModal}>
            <div className='w-[150px] text-sm font-medium text-white'>
              취소하기
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignInModal;
