import {
  createFileRoute,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router';

import { SocketProvider } from '@/features/socket';

import { ChattingList } from '@/components';

export const Route = createFileRoute('/session')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/session') window.location.href = '/';
  },
  component: () => (
    <div className='flex h-full w-full items-center justify-center gap-4 px-4 py-4 md:max-w-[1194px]'>
      <SocketProvider>
        <ScrollRestoration />
        <Outlet />
        <ChattingList />
      </SocketProvider>
    </div>
  ),
});
