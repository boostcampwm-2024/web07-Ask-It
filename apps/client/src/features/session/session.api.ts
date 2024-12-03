import axios from 'axios';

import {
  GetSessionsResponseDTO,
  GetSessionsResponseSchema,
  GetSessionTokenResponseDTO,
  GetSessionTokenResponseSchema,
  GetSessionUsersRequestDTO,
  GetSessionUsersRequestSchema,
  GetSessionUsersResponseDTO,
  GetSessionUsersResponseSchema,
  PatchSessionHostRequestDTO,
  PatchSessionHostRequestSchema,
  PatchSessionHostResponseDTO,
  PatchSessionHostResponseSchema,
  PostSessionRequestDTO,
  PostSessionRequestSchema,
  PostSessionResponseDTO,
  PostSessionResponseSchema,
  PostSessionTerminateRequestDTO,
  PostSessionTerminateRequestSchema,
  PostSessionTerminateResponseSchema,
} from '@/features/session/session.dto';

export const postSession = (body: PostSessionRequestDTO) =>
  axios
    .post<PostSessionResponseDTO>('/api/sessions', PostSessionRequestSchema.parse(body))
    .then((res) => PostSessionResponseSchema.parse(res.data));

export const getSessions = () =>
  axios.get<GetSessionsResponseDTO>('/api/sessions').then((res) => GetSessionsResponseSchema.parse(res.data));

export const getSessionToken = (sessionId: string) => {
  const tokens = JSON.parse(localStorage.getItem('sessionTokens') || '{}') as Record<string, string>;

  const token = tokens[sessionId];

  return axios
    .get<GetSessionTokenResponseDTO>(`/api/sessions-auth`, {
      params: {
        sessionId,
        token,
      },
    })
    .then((res) => GetSessionTokenResponseSchema.parse(res.data))
    .then((data) => {
      localStorage.setItem('sessionTokens', JSON.stringify({ ...tokens, [sessionId]: data.token }));
      return data;
    });
};

export const getSessionUsers = (params: GetSessionUsersRequestDTO) =>
  axios
    .get<GetSessionUsersResponseDTO>('/api/sessions-auth/users', {
      params: GetSessionUsersRequestSchema.parse(params),
    })
    .then((res) => GetSessionUsersResponseSchema.parse(res.data));

export const patchSessionHost = (userId: number, body: PatchSessionHostRequestDTO) =>
  axios
    .patch<PatchSessionHostResponseDTO>(`/api/sessions-auth/host/${userId}`, PatchSessionHostRequestSchema.parse(body))
    .then((res) => PatchSessionHostResponseSchema.parse(res.data));

export const postSessionTerminate = ({ token, sessionId }: PostSessionTerminateRequestDTO & { sessionId: string }) =>
  axios
    .post(`/api/sessions/${sessionId}/terminate`, PostSessionTerminateRequestSchema.parse({ token }))
    .then((res) => PostSessionTerminateResponseSchema.parse(res.data));
