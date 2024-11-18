import axios from 'axios';

import {
  CreateSessionRequestDTO,
  CreateSessionResponseDTO,
  GetSessionsResponseDTO,
  GetSessionTokenResponseDTO,
} from '@/features/session/session.dto';

export const createSession = (
  createSessionRequestDTO: CreateSessionRequestDTO,
) =>
  axios
    .post<CreateSessionResponseDTO>('/api/sessions', createSessionRequestDTO)
    .then((res) => res.data);

export const getSessions = () =>
  axios.get<GetSessionsResponseDTO>('/api/sessions').then((res) => res.data);

export const getSessionToken = (sessionId: string) => {
  const tokens = JSON.parse(
    localStorage.getItem('sessionTokens') || '{}',
  ) as Record<string, string>;

  const token = tokens[sessionId];

  return axios
    .get<GetSessionTokenResponseDTO>(`/api/sessions-auth`, {
      params: {
        session_id: sessionId,
        token,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      localStorage.setItem(
        'sessionTokens',
        JSON.stringify({ ...tokens, [sessionId]: data.data.token }),
      );
      return data;
    });
};
