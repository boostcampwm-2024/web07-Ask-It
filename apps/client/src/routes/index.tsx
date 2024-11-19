import { createFileRoute } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { HomePage } from '@/pages';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (!useAuthStore.getState().isLogin())
      refresh().then((res) => {
        useAuthStore.getState().setAccessToken(res.accessToken);
      });
  },
  component: HomePage,
});
