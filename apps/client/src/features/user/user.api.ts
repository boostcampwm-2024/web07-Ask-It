import axios from 'axios';

import {
  GetVerifyEmailDTO,
  GetVerifyNicknameDTO,
  PostUserDTO,
} from '@/features/user/user.dto';

const USER_BASE_URL = `/api/users`;

export const postUser = (body: PostUserDTO) => axios.post(USER_BASE_URL, body);

export const getVerifyEmail = (email: string) =>
  axios
    .get<GetVerifyEmailDTO>(`${USER_BASE_URL}/emails/${email}`)
    .then((res) => res.data);

export const getVerifyNickname = (nickname: string) =>
  axios
    .get<GetVerifyNicknameDTO>(
      `${USER_BASE_URL}/nicknames/${encodeURIComponent(nickname)}`,
    )
    .then((res) => res.data);
