import { createFileRoute, redirect } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { MyPage } from '@/pages';

export const Route = createFileRoute('/my')({
  component: MyPage,
  beforeLoad: () => {
    if (!useAuthStore.getState().isLogin())
      refresh()
        .then((res) => {
          useAuthStore.getState().setAccessToken(res.accessToken);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw redirect({ to: '/' });
        });
  },
});
