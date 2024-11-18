import axios from 'axios';

import {
  CreateSessionRequestDTO,
  CreateSessionResponseDTO,
  GetSessionsResponseDTO,
} from '@/features/session/session.dto';

export const createSession = (
  createSessionRequestDTO: CreateSessionRequestDTO,
) =>
  axios
    .post<CreateSessionResponseDTO>('/api/sessions', createSessionRequestDTO)
    .then((res) => res.data);

export const getSessions = () =>
  axios.get<GetSessionsResponseDTO>('/api/sessions').then((res) => res.data);

export const getSessionToken = (sessionId: string, token?: string) =>
  axios
    .get(`/api/sessions-auth`, {
      params: {
        session_id: sessionId,
        token,
      },
    })
    .then((res) => res.data);
