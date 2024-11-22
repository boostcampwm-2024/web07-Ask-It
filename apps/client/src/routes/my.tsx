import { createFileRoute } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';

import { MyPage } from '@/pages';

export const Route = createFileRoute('/my')({
  component: MyPage,
  beforeLoad: () => {
    const { isLogin, setAccessToken } = useAuthStore.getState();
    if (!isLogin())
      refresh()
        .then((res) => {
          setAccessToken(res.accessToken);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          window.location.href = '/';
        });
  },
});
