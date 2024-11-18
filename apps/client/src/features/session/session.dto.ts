export interface CreateSessionRequestDTO {
  title: string;
}

export interface CreateSessionResponseDTO {
  sessionId: string;
}

export interface GetSessionsResponseDTO {
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
}

export interface GetSessionTokenResponseDTO {
  token: string;
}
