import { useMutation } from '@tanstack/react-query';
import { useRouterState } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import { login } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';
import { useToastStore } from '@/features/toast';

import { ValidationStatusWithMessage } from '@/shared';

export function useSignInForm() {
  const router = useRouterState();

  const { setAuthInformation } = useAuthStore();

  const { addToast } = useToastStore();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loginFailed, setLoginFailed] = useState<ValidationStatusWithMessage>({
    status: 'INITIAL',
  });

  const { mutate: loginQuery, isPending } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
    onSuccess: (response) => {
      addToast({
        type: 'SUCCESS',
        message: '로그인 되었습니다.',
        duration: 3000,
      });
      setAuthInformation(response);
      if (router.location.pathname.includes('session')) {
        window.location.reload();
      }
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setLoginFailed({
            status: 'INVALID',
            message: error.response.data.messages.shift(),
          });
        } else if (error.response.status === 401) {
          setLoginFailed({
            status: 'INVALID',
            message: error.response.data.message,
          });
        }
      }
    },
  });

  const isLoginEnabled = email.length > 0 && password.length > 7 && !isPending;

  const handleLogin = (callback: () => void) =>
    loginQuery({ email, password }, { onSuccess: callback });

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoginEnabled,
    loginFailed,
    handleLogin,
  };
}
