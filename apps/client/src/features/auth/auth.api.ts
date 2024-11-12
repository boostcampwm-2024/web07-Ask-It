import axios from 'axios';

import {
  CreateUserDTO,
  VerifyEmailDTO,
  VerifyNicknameDTO,
} from '@/features/auth/auth.dto';

const USER_BASE_URL = `${import.meta.env.VITE_SERVER_API_URL}/users`;

export const createUser = (createUserDTO: CreateUserDTO) =>
  axios.post(USER_BASE_URL, createUserDTO);

export const verifyEmail = (email: string) =>
  axios
    .get<VerifyEmailDTO>(`${USER_BASE_URL}/emails/${email}`)
    .then((res) => res.data);

export const verifyNickname = (nickname: string) =>
  axios
    .get<VerifyNicknameDTO>(`${USER_BASE_URL}/nicknames/${nickname}`)
    .then((res) => res.data);
