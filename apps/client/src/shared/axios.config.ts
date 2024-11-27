import axios from 'axios';

import { useAuthStore } from '@/features/auth';

axios.interceptors.request.use(
  (config) => {
    const nextConfig = { ...config };
    const { accessToken } = useAuthStore.getState();
    if (accessToken) nextConfig.headers.Authorization = `Bearer ${accessToken}`;
    return nextConfig;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    if (status === 401 && data.message === '유효하지 않은 액세스 토큰입니다.') {
      const originalRequest = config;

      const response = await fetch('/api/auth/token', {
        method: 'POST',
        credentials: 'include',
      });

      const { type, data: result } = (await response.json()) as {
        type: 'success' | 'fail';
        data: { accessToken: string };
      };

      const { setAuthInformation, clearAuthInformation } =
        useAuthStore.getState();

      if (type === 'success' && result.accessToken) {
        setAuthInformation(result);
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return axios(originalRequest);
      }

      clearAuthInformation();
    }

    return Promise.reject(error);
  },
);
