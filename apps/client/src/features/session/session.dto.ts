import { User } from '@/features/session/session.type';

export interface PostSessionRequestDTO {
  title: string;
}

export interface PostSessionResponseDTO {
  sessionId: string;
}

export interface GetSessionsResponseDTO {
  sessionData: Array<{
    sessionId: string;
    title: string;
    createdAt: {
      year: number;
      month: number;
      date: number;
    };
    expired: boolean;
  }>;
}

export interface GetSessionTokenResponseDTO {
  token: string;
}

export interface GetSessionUsersRequestDTO {
  token: string;
  sessionId: string;
}

export interface GetSessionUsersResponseDTO {
  users: User[];
}

export interface PatchSessionHostRequestDTO {
  token: string;
  sessionId: string;
  isHost: boolean;
}

export interface PatchSessionHostResponseDTO {
  user: User;
}
