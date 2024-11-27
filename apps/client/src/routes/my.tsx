import { createFileRoute, redirect } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';

import { MyPage } from '@/pages';

export const Route = createFileRoute('/my')({
  component: MyPage,
  beforeLoad: () => {
    const { isLogin, setAuthInformation } = useAuthStore.getState();

    if (!isLogin()) {
      return refresh()
        .then((res) => {
          setAuthInformation(res);
        })
        .catch(() => {
          throw redirect({ to: '/' });
        });
    }
    return Promise.resolve();
  },
});
