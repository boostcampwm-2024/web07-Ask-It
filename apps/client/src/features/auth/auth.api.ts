import axios from 'axios';

import {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshResponseDTO,
} from '@/features/auth/auth.dto';

const AUTH_BASE_URL = '/api/auth';

export const login = (loginDTO: LoginRequestDTO) =>
  axios
    .post<LoginResponseDTO>(`${AUTH_BASE_URL}/login`, loginDTO)
    .then((res) => res.data);

export const logout = () => axios.post(`${AUTH_BASE_URL}/logout`);

export const refresh = () =>
  axios
    .post<RefreshResponseDTO>(`${AUTH_BASE_URL}/token`, undefined, {
      withCredentials: true,
    })
    .then((res) => res.data);
