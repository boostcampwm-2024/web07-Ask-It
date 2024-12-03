import axios from 'axios';

import { useAuthStore } from '@/features/auth';
import { PostRefreshResponseDTO } from '@/features/auth/auth.dto';

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

      const { accessToken, userId } = (await response.json()) as PostRefreshResponseDTO;

      const { setAuthInformation, clearAuthInformation } = useAuthStore.getState();

      if (accessToken) {
        setAuthInformation({ accessToken, userId });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      }

      clearAuthInformation();
    }

    return Promise.reject(error);
  },
);
