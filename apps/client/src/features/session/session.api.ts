import axios from 'axios';

import {
  GetSessionsResponseDTO,
  GetSessionTokenResponseDTO,
  GetSessionUsersRequestDTO,
  GetSessionUsersResponseDTO,
  PatchSessionHostRequestDTO,
  PatchSessionHostResponseDTO,
  PostSessionRequestDTO,
  PostSessionResponseDTO,
} from '@/features/session/session.dto';

export const postSession = (body: PostSessionRequestDTO) =>
  axios
    .post<PostSessionResponseDTO>('/api/sessions', body)
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
        sessionId,
        token,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      localStorage.setItem(
        'sessionTokens',
        JSON.stringify({ ...tokens, [sessionId]: data.token }),
      );
      return data;
    });
};

export const getSessionUsers = ({
  token,
  sessionId,
}: GetSessionUsersRequestDTO) =>
  axios
    .get<GetSessionUsersResponseDTO>('/api/sessions-auth/users', {
      params: { token, sessionId },
    })
    .then((res) => res.data);

export const patchSessionHost = (
  userId: number,
  body: PatchSessionHostRequestDTO,
) =>
  axios
    .patch<PatchSessionHostResponseDTO>(
      `/api/sessions-auth/host/${userId}`,
      body,
    )
    .then((res) => res.data);
