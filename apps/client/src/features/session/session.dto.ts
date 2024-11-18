export interface CreateSessionRequestDTO {
  title: string;
}

export interface CreateSessionResponseDTO {
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
