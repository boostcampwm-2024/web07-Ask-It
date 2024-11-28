import axios from 'axios';

import {
  PostLoginRequestDTO,
  PostLoginRequestSchema,
  PostLoginResponseDTO,
  PostLoginResponseSchema,
  PostRefreshResponseDTO,
  PostRefreshResponseSchema,
} from '@/features/auth/auth.dto';

const AUTH_BASE_URL = '/api/auth';

export const login = (body: PostLoginRequestDTO) =>
  axios
    .post<PostLoginResponseDTO>(
      `${AUTH_BASE_URL}/login`,
      PostLoginRequestSchema.parse(body),
    )
    .then((res) => PostLoginResponseSchema.parse(res.data));

export const logout = () => axios.post(`${AUTH_BASE_URL}/logout`);

export const refresh = () =>
  axios
    .post<PostRefreshResponseDTO>(`${AUTH_BASE_URL}/token`, undefined, {
      withCredentials: true,
    })
    .then((res) => PostRefreshResponseSchema.parse(res.data));
