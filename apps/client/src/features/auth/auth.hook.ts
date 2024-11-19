import { useRouterState } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import { login } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';
import { ValidationStatusWithMessage } from '@/shared';

export function useSignInForm() {
  const router = useRouterState();

  const { setAccessToken } = useAuthStore();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const isLoginEnabled = email.length > 0 && password.length > 7;

  const [loginFailed, setLoginFailed] = useState<ValidationStatusWithMessage>({
    status: 'INITIAL',
  });

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      setAccessToken(response.accessToken);
      if (router.location.pathname.includes('session'))
        window.location.reload();
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        if (e.response.status === 400) {
          setLoginFailed({
            status: 'INVALID',
            message: e.response.data.messages.shift(),
          });
        } else if (e.response.status === 401) {
          setLoginFailed({
            status: 'INVALID',
            message: e.response.data.message,
          });
        }
      }
      throw e;
    }
  };

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
