import { useModalContext } from '@/features/modal';
import { useToastStore } from '@/features/toast';
import { postUser, useSignUpForm } from '@/features/user';

import Button from '../Button';

import InputField from '@/components/modal/InputField';
import Modal from '@/components/modal/Modal';

function SignUpModal() {
  const addToast = useToastStore((state) => state.addToast);

  const { closeModal } = useModalContext();

  const {
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    emailValidationStatus,
    nicknameValidationStatus,
    passwordValidationStatus,
    isSignUpEnabled,
  } = useSignUpForm();

  const signUp = () =>
    isSignUpEnabled &&
    postUser({ email, nickname, password }).then(() => {
      closeModal();
      addToast({
        type: 'SUCCESS',
        message: '회원가입 되었습니다.',
        duration: 3000,
      });
    });

  return (
    <Modal>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <p className='text-2xl font-bold text-indigo-600'>Ask-It</p>
        <InputField
          label='이메일'
          type='email'
          value={email}
          onChange={setEmail}
          placeholder='example@gmail.com'
          validationStatus={emailValidationStatus}
        />
        <InputField
          label='닉네임'
          type='text'
          value={nickname}
          onChange={setNickname}
          placeholder='닉네임을 입력해주세요'
          validationStatus={nicknameValidationStatus}
        />
        <InputField
          label='비밀번호'
          type='password'
          value={password}
          onChange={setPassword}
          placeholder='비밀번호를 입력해주세요'
          validationStatus={passwordValidationStatus}
        />
        <div className='mt-4 inline-flex items-start justify-start gap-2.5'>
          <Button className='bg-gray-500' onClick={closeModal}>
            <div className='w-[150px] text-sm font-medium text-white'>
              취소하기
            </div>
          </Button>
          <Button
            className={`transition-colors duration-200 ${isSignUpEnabled ? 'bg-indigo-600' : 'cursor-not-allowed bg-indigo-300'}`}
            onClick={signUp}
          >
            <div className='w-[150px] text-sm font-medium text-white'>
              회원 가입
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;
