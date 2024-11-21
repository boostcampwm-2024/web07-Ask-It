import { useContext } from 'react';

import { SocketContext } from '@/features/socket/socket.context';

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};
