import Button from '../Button';

import InputField from '@/components/modal/InputField';
import Modal from '@/components/modal/Modal';
import { useModalContext } from '@/features/modal';
import { useSignUpForm } from '@/features/session';

function SignUpModal() {
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
  } = useSignUpForm();

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
          validMessage='사용 가능한 이메일입니다.'
          invalidMessage='이미 사용 중인 이메일입니다.'
        />
        <InputField
          label='닉네임'
          type='text'
          value={nickname}
          onChange={setNickname}
          placeholder='닉네임을 입력해주세요'
          validationStatus={nicknameValidationStatus}
          validMessage='사용 가능한 닉네임입니다.'
          invalidMessage='이미 사용 중인 닉네임입니다.'
        />
        <InputField
          label='비밀번호'
          type='password'
          value={password}
          onChange={setPassword}
          placeholder='비밀번호를 입력해주세요'
        />
        <div className='mt-4 inline-flex items-start justify-start gap-2.5'>
          <Button
            className='bg-indigo-600'
            onClick={() => {
              // TODO: 회원 가입 API 요청
              closeModal();
            }}
          >
            <div className='w-[150px] text-sm font-medium text-white'>
              회원 가입
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

export default SignUpModal;
