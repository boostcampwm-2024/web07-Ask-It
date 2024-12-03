import { BroadcastEventDto } from '@socket/dto/broadcast-event.dto';

const SOCKET_SERVER_HOST = process.env.SOCKET_SERVER_HOST;
const SOCKET_SERVER_PORT = process.env.SOCKET_SERVER_PORT;

export const requestSocket = async ({ event, content, sessionId, token }: BroadcastEventDto) => {
  try {
    await fetch(`${SOCKET_SERVER_HOST}:${SOCKET_SERVER_PORT}/api/socket/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        content,
        sessionId,
        token,
      }),
    });
  } catch (error) {
    throw error;
  }
};
