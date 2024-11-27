import { createFileRoute } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';

import { HomePage } from '@/pages';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isLogin, setAuthInformation } = useAuthStore.getState();

    if (!isLogin())
      refresh().then((res) => {
        setAuthInformation(res);
      });
  },
  component: HomePage,
});
