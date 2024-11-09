import { debounce } from 'es-toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type ValidationStatus = 'VALID' | 'INVALID' | 'PENDING';

export function useSignUpForm() {
  const [email, setEmail] = useState('');

  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');

  const [emailValidationStatus, setEmailValidationStatus] =
    useState<ValidationStatus>('PENDING');

  const [nicknameValidationStatus, setNicknameDuplicateStatus] =
    useState<ValidationStatus>('PENDING');

  const isSignUpEnabled = useMemo(
    () =>
      emailValidationStatus === 'VALID' &&
      nicknameValidationStatus === 'VALID' &&
      password.length > 0,
    [emailValidationStatus, nicknameValidationStatus, password],
  );

  // TODO: 이메일 중복 확인 API 요청, 매개변수 추가 필요. (emailToVerify: string)
  const checkEmailToVerify = useCallback(
    debounce(async () => {
      console.log('checkEmailToVerify');
      const isDuplicate = await new Promise<boolean>((resolve) => {
        resolve(true);
      });
      setEmailValidationStatus(isDuplicate ? 'INVALID' : 'VALID');
    }, 500),
    [],
  );

  // TODO: 닉네임 중복 확인 API 요청, 매개변수 추가 필요. (nicknameToVerify: string)
  const checkNicknameToVerify = useCallback(
    debounce(async () => {
      console.log('checkNicknameToVerify');
      const isDuplicate = await new Promise<boolean>((resolve) => {
        resolve(true);
      });
      setNicknameDuplicateStatus(isDuplicate ? 'INVALID' : 'VALID');
    }, 500),
    [],
  );

  useEffect(() => {
    if (email) {
      checkEmailToVerify();
    }
  }, [email, checkEmailToVerify]);

  useEffect(() => {
    if (nickname) {
      checkNicknameToVerify();
    }
  }, [nickname, checkNicknameToVerify]);

  return {
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    emailValidationStatus,
    nicknameValidationStatus,
    isSignUpEnabled,
  };
}

export function useSignInForm() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoginFailed,
    setIsLoginFailed,
  };
}
