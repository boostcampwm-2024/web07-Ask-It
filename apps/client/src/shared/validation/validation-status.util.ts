import { ValidationStatusWithMessage } from '@/shared/validation/validation-status.type';

export const validateEmail = (email: string): ValidationStatusWithMessage => {
  if (!email) return { status: 'INITIAL' };
  if (email.includes(' '))
    return {
      status: 'INVALID',
      message: '이메일에 공백이 포함될 수 없습니다.',
    };
  return { status: 'PENDING', message: '유효 여부를 검사 중입니다.' };
};

export const validateNickname = (
  nickname: string,
): ValidationStatusWithMessage => {
  if (!nickname) return { status: 'INITIAL' };
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
  return { status: 'PENDING', message: '유효 여부를 검사 중입니다.' };
};

export const validatePassword = (
  password: string,
): ValidationStatusWithMessage => {
  if (!password) return { status: 'INITIAL' };
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
