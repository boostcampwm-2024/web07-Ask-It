import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Header } from '@/components';

// eslint-disable-next-line import/prefer-default-export
export const Route = createRootRoute({
  component: () => (
    <div className='flex h-dvh w-dvw min-w-[390px] flex-col bg-gray-50'>
      <Header />
      <main className='flex flex-grow items-center justify-center overflow-y-hidden'>
        <Outlet />
      </main>
    </div>
  ),
});
