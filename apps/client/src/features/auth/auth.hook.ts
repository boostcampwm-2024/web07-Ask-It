import { debounce } from 'es-toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { verifyEmail, verifyNickname } from '@/features/auth/index';

export type ValidationStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DUPLICATE';

export function useSignUpForm() {
  const [email, setEmail] = useState('');

  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');

  const [emailValidationStatus, setEmailValidationStatus] =
    useState<ValidationStatus>('PENDING');

  const [nicknameValidationStatus, setNicknameValidationStatus] =
    useState<ValidationStatus>('PENDING');

  const [passwordValidationStatus, setPasswordValidationStatus] =
    useState<ValidationStatus>('PENDING');

  const isSignUpEnabled = useMemo(
    () =>
      emailValidationStatus === 'VALID' &&
      nicknameValidationStatus === 'VALID' &&
      passwordValidationStatus === 'VALID',
    [emailValidationStatus, nicknameValidationStatus, passwordValidationStatus],
  );

  const checkEmailToVerify = useCallback(
    debounce(async (emailToVerify: string) => {
      const response = await verifyEmail(emailToVerify);
      setEmailValidationStatus(response.data.exists ? 'DUPLICATE' : 'VALID');
    }, 500),
    [],
  );

  const checkNicknameToVerify = useCallback(
    debounce(async (nicknameToVerify) => {
      const response = await verifyNickname(nicknameToVerify);
      setNicknameValidationStatus(response.data.exists ? 'DUPLICATE' : 'VALID');
    }, 500),
    [],
  );

  useEffect(() => {
    if (!email) setEmailValidationStatus('PENDING');
    else checkEmailToVerify(email);
  }, [email, checkEmailToVerify]);

  useEffect(() => {
    if (!nickname) {
      setNicknameValidationStatus('PENDING');
      return;
    }

    if (nickname.length < 3 || nickname.length > 20) {
      setNicknameValidationStatus('INVALID');
      return;
    }

    checkNicknameToVerify(nickname);
  }, [nickname, checkNicknameToVerify]);

  useEffect(() => {
    if (!password) {
      setPasswordValidationStatus('PENDING');
      return;
    }

    if (password.length < 8 || password.length > 20 || password.includes(' ')) {
      setPasswordValidationStatus('INVALID');
      return;
    }

    setPasswordValidationStatus('VALID');
  }, [password]);

  return {
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
