import {
  createFileRoute,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router';
import { useEffect } from 'react';

import { ChattingList } from '@/components';
import { useSessionStore } from '@/features/session/session.store';
import { SocketService } from '@/features/socket';

function Session() {
  const { sessionId, sessionToken } = useSessionStore();

  useEffect(() => {
    if (!sessionId || !sessionToken) return () => {};

    const socketService = new SocketService(sessionId, sessionToken);

    socketService.setupSubscriptions();

    return () => {
      socketService.disconnect();
    };
  }, [sessionId, sessionToken]);

  return (
    <div className='flex h-full w-full items-center justify-center gap-4 px-4 py-4 md:max-w-[1194px]'>
      <ScrollRestoration />
      <Outlet />
      <ChattingList />
    </div>
  );
}

export const Route = createFileRoute('/session')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/session') window.location.href = '/';
  },
  component: Session,
});
