import axios from 'axios';

import {
  PostLoginRequestDTO,
  PostLoginRequestSchema,
  PostLoginResponseDTO,
  PostLoginResponseSchema,
  PostRefreshResponseDTO,
  PostRefreshResponseSchema,
} from '@/features/auth/auth.dto';

export const login = (body: PostLoginRequestDTO) =>
  axios
    .post<PostLoginResponseDTO>(`/api/auth/login`, PostLoginRequestSchema.parse(body))
    .then((res) => PostLoginResponseSchema.parse(res.data));

export const logout = () => axios.post(`/api/auth/logout`);

export const refresh = () =>
  axios
    .post<PostRefreshResponseDTO>(`/api/auth/token`, undefined, {
      withCredentials: true,
    })
    .then((res) => PostRefreshResponseSchema.parse(res.data));
