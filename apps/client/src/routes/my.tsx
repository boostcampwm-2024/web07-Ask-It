import { createFileRoute, redirect } from '@tanstack/react-router';

import { useAuthStore } from '@/features/auth';
import { MyPage } from '@/pages';

export const Route = createFileRoute('/my')({
  component: MyPage,
  beforeLoad: async () => {
    if (!useAuthStore.getState().isLogin()) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw redirect({ to: '/' });
    }
  },
});
