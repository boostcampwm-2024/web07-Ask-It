import { SuccessDTO } from '@/shared';

export interface CreateSessionRequestDTO {
  title: string;
}

export type CreateSessionResponseDTO = SuccessDTO<{
  sessionId: string;
}>;

export type GetSessionsResponseDTO = SuccessDTO<{
  sessionData: Array<{
    session_id: string;
    title: string;
    created_at: {
      year: number;
      month: number;
      date: number;
    };
    expired: boolean;
  }>;
}>;

export type GetSessionTokenResponseDTO = SuccessDTO<{
  token: string;
}>;
