import { useState } from 'react';

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
