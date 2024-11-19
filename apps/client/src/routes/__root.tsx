import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Header } from '@/components';
import { refresh, useAuthStore } from '@/features/auth';
import { ToastContainer } from '@/features/toast';

export const Route = createRootRoute({
  beforeLoad: () => {
    if (!useAuthStore.getState().isLogin())
      refresh().then((res) => {
        useAuthStore.getState().setAccessToken(res.accessToken);
      });
  },
  component: () => (
    <div className='flex h-dvh w-dvw min-w-[390px] flex-col bg-gray-50'>
      <Header />
      <main className='flex flex-grow items-center justify-center overflow-y-hidden'>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  ),
});
