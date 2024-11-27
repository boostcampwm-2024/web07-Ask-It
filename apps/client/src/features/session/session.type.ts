export interface Session {
  sessionId: string;
  title: string;
  expired: boolean;
  createdAt: string;
}

export interface User {
  userId: number;
  nickname: string;
  isHost: boolean;
}
