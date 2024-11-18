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
    create_at: {
      year: number;
      month: number;
      day: number;
    };
    expired: boolean;
  }>;
}>;

export type GetSessionTokenResponseDTO = SuccessDTO<{
  token: string;
}>;
