import { isAxiosError } from 'axios';
import { debounce } from 'es-toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getVerifyEmail, getVerifyNickname } from '@/features/user/index';

import {
  validateEmail,
  validateNickname,
  validatePassword,
  ValidationStatusWithMessage,
} from '@/shared';

export function useSignUpForm() {
  const [email, setEmail] = useState('');

  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');

  const [emailValidationStatus, setEmailValidationStatus] =
    useState<ValidationStatusWithMessage>({ status: 'INITIAL' });

  const [nicknameValidationStatus, setNicknameValidationStatus] =
    useState<ValidationStatusWithMessage>({ status: 'INITIAL' });

  const [passwordValidationStatus, setPasswordValidationStatus] =
    useState<ValidationStatusWithMessage>({ status: 'INITIAL' });

  const isSignUpEnabled = useMemo(
    () =>
      emailValidationStatus.status === 'VALID' &&
      nicknameValidationStatus.status === 'VALID' &&
      passwordValidationStatus.status === 'VALID',
    [emailValidationStatus, nicknameValidationStatus, passwordValidationStatus],
  );

  const checkEmailToVerify = useCallback(
    debounce(async (emailToVerify: string) => {
      try {
        const response = await getVerifyEmail(emailToVerify);

        setEmail(emailToVerify);
        setEmailValidationStatus(
          response.exists
            ? { status: 'INVALID', message: '이미 사용 중인 이메일입니다.' }
            : { status: 'VALID', message: '사용 가능한 이메일입니다.' },
        );
      } catch (error) {
        if (!isAxiosError(error)) return;

        const message =
          error.response?.data.message ??
          error.response?.data.messages.shift() ??
          '알 수 없는 오류가 발생했습니다.';

        setEmailValidationStatus({
          status: 'INVALID',
          message,
        });
      }
    }, 1500),
    [],
  );

  const checkNicknameToVerify = useCallback(
    debounce(async (nicknameToVerify: string) => {
      try {
        const response = await getVerifyNickname(nicknameToVerify);

        setNickname(nicknameToVerify);
        setNicknameValidationStatus(
          response.exists
            ? { status: 'INVALID', message: '이미 사용 중인 닉네임입니다.' }
            : { status: 'VALID', message: '사용 가능한 닉네임입니다.' },
        );
      } catch (error) {
        if (!isAxiosError(error)) return;

        const message =
          error.response?.data.message ??
          error.response?.data.messages.shift() ??
          '알 수 없는 오류가 발생했습니다.';

        setNicknameValidationStatus({
          status: 'INVALID',
          message,
        });
      }
    }, 1500),
    [],
  );

  useEffect(() => {
    const validationStatus = validateEmail(email);
    setEmailValidationStatus(validationStatus);
    if (validationStatus.status === 'PENDING') checkEmailToVerify(email);
    else checkEmailToVerify.cancel();
  }, [email, checkEmailToVerify]);

  useEffect(() => {
    const validationStatus = validateNickname(nickname);
    setNicknameValidationStatus(validationStatus);
    if (validationStatus.status === 'PENDING') checkNicknameToVerify(nickname);
    else checkNicknameToVerify.cancel();
  }, [nickname, checkNicknameToVerify]);

  useEffect(() => {
    setPasswordValidationStatus(validatePassword(password));
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
