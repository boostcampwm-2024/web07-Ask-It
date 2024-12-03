/* eslint-disable import/prefer-default-export */
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { useSessionStore } from '@/features/session';
import { SocketService } from '@/features/socket/socket.service';

interface SocketContextType {
  socket?: SocketService;
}

export const SocketContext = createContext<SocketContextType>({});

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { expired, sessionId, sessionToken } = useSessionStore();

  const [socket, setSocket] = useState<SocketService>();

  const value = useMemo(() => ({ socket }), [socket]);

  useEffect(() => {
    if (expired || !sessionId || !sessionToken) return () => {};

    const socketService = new SocketService(sessionId, sessionToken);

    setSocket(socketService);

    socketService.setupSubscriptions();

    return () => {
      socketService.disconnect();
    };
  }, [expired, sessionId, sessionToken]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
