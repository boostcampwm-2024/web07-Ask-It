import { createFileRoute } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { HomePage } from '@/pages';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isLogin, setAccessToken } = useAuthStore.getState();

    if (!isLogin())
      refresh().then((res) => {
        setAccessToken(res.accessToken);
      });
  },
  component: HomePage,
});
