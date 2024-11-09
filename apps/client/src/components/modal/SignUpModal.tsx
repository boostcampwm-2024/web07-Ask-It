import { useState } from 'react';

import Button from '../Button';

import InputField from '@/components/modal/InputField';
import Modal from '@/components/modal/Modal';
import { useModalContext } from '@/features/modal';

function SignUpModal() {
  const { closeModal } = useModalContext();

  const [email, setEmail] = useState('');

  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');

  const [isDuplicateEmail] = useState(false);

  const [isDuplicateNickname] = useState(false);

  return (
    <Modal>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <p className="font-['Pretendard'] text-2xl font-bold text-indigo-600">
          Ask-It
        </p>
        <div>
          <InputField
            label='이메일'
            type='email'
            value={email}
            onChange={setEmail}
            placeholder='example@gmail.com'
          />
          <div
            className={`w-[411px] text-right font-['Pretendard'] text-sm font-medium text-[#ff0808] transition-all duration-500 ease-in-out ${
              isDuplicateEmail ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            중복된 이메일입니다.
          </div>
        </div>
        <div>
          <InputField
            label='닉네임'
            type='text'
            value={nickname}
            onChange={setNickname}
            placeholder='닉네임을 입력해주세요'
          />
          <div
            className={`w-[411px] text-right font-['Pretendard'] text-sm font-medium text-[#ff0808] transition-all duration-500 ease-in-out ${
              isDuplicateNickname ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            중복된 닉네임이 있습니다.
          </div>
        </div>
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
            <div className="w-[150px] font-['Pretendard'] text-sm font-medium text-white">
              회원 가입
            </div>
          </Button>
          <Button className='bg-gray-500' onClick={closeModal}>
            <div className="w-[150px] font-['Pretendard'] text-sm font-medium text-white">
              취소하기
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;
