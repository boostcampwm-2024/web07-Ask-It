import { debounce } from 'es-toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { verifyEmail, verifyNickname } from '@/features/auth/index';

export type ValidationStatus = 'VALID' | 'INVALID' | 'PENDING';

export interface ValidationStatusWithMessage {
  status: ValidationStatus;
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): ValidationStatusWithMessage => {
  if (!emailRegex.test(email))
    return { status: 'INVALID', message: '이메일 형식이 올바르지 않습니다.' };
  if (email.includes(' '))
    return {
      status: 'INVALID',
      message: '이메일에 공백이 포함될 수 없습니다.',
    };
  return { status: 'PENDING' };
};

const validateNickname = (nickname: string): ValidationStatusWithMessage => {
  if (nickname.length < 3 || nickname.length > 20)
    return {
      status: 'INVALID',
      message: '닉네임은 3-20자 사이로 입력해주세요.',
    };
  if (nickname.includes(' '))
    return {
      status: 'INVALID',
      message: '닉네임에 공백이 포함될 수 없습니다.',
    };
  return { status: 'PENDING' };
};

const validatePassword = (password: string): ValidationStatusWithMessage => {
  if (!password) return { status: 'PENDING' };
  if (password.length < 8 || password.length > 20)
    return {
      status: 'INVALID',
      message: '비밀번호는 8-20자 사이로 입력해주세요.',
    };
  if (password.includes(' '))
    return {
      status: 'INVALID',
      message: '비밀번호에는 공백이 포함될 수 없습니다.',
    };
  return { status: 'VALID', message: '사용 가능한 비밀번호입니다.' };
};

export function useSignUpForm() {
  const [email, setEmail] = useState('');

  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');

  const [emailValidationStatus, setEmailValidationStatus] =
    useState<ValidationStatusWithMessage>({ status: 'PENDING' });

  const [nicknameValidationStatus, setNicknameValidationStatus] =
    useState<ValidationStatusWithMessage>({ status: 'PENDING' });

  const [passwordValidationStatus, setPasswordValidationStatus] =
    useState<ValidationStatusWithMessage>({ status: 'PENDING' });

  const isSignUpEnabled = useMemo(
    () =>
      emailValidationStatus.status === 'VALID' &&
      nicknameValidationStatus.status === 'VALID' &&
      passwordValidationStatus.status === 'VALID',
    [emailValidationStatus, nicknameValidationStatus, passwordValidationStatus],
  );

  const checkEmailToVerify = useCallback(
    debounce(async (emailToVerify: string) => {
      const response = await verifyEmail(emailToVerify);

      setEmailValidationStatus(
        response.data.exists
          ? { status: 'INVALID', message: '이미 사용 중인 이메일입니다.' }
          : { status: 'VALID', message: '사용 가능한 이메일입니다.' },
      );
    }, 500),
    [],
  );

  const checkNicknameToVerify = useCallback(
    debounce(async (nicknameToVerify) => {
      const response = await verifyNickname(nicknameToVerify);

      setNicknameValidationStatus(
        response.data.exists
          ? { status: 'INVALID', message: '이미 사용 중인 닉네임입니다.' }
          : { status: 'VALID', message: '사용 가능한 닉네임입니다.' },
      );
    }, 500),
    [],
  );

  useEffect(() => {
    const validationStatus = validateEmail(email);
    setEmailValidationStatus(validationStatus);
    if (validationStatus.status === 'PENDING') checkEmailToVerify(email);
  }, [email, checkEmailToVerify]);

  useEffect(() => {
    const validationStatus = validateNickname(nickname);
    setNicknameValidationStatus(validationStatus);
    if (validationStatus.status === 'PENDING') checkNicknameToVerify(nickname);
  }, [nickname, checkNicknameToVerify]);

  useEffect(() => {
    setPasswordValidationStatus(validatePassword(password));
  }, [password]);

  useEffect(() => {
    if (emailValidationStatus.status === 'VALID' && email.length === 0)
      setEmailValidationStatus({ status: 'PENDING' });
  }, [email.length, emailValidationStatus.status]);

  useEffect(() => {
    if (nicknameValidationStatus.status === 'VALID' && nickname.length === 0)
      setNicknameValidationStatus({ status: 'PENDING' });
  }, [nickname.length, nicknameValidationStatus.status]);

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
