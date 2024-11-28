import axios from 'axios';

import {
  GetVerifyEmailDTO,
  GetVerifyEmailSchema,
  GetVerifyNicknameDTO,
  GetVerifyNicknameSchema,
  PostUserDTO,
  PostUserSchema,
} from '@/features/user/user.dto';

const USER_BASE_URL = `/api/users`;

export const postUser = (body: PostUserDTO) =>
  axios.post(USER_BASE_URL, PostUserSchema.parse(body));

export const getVerifyEmail = (email: string) =>
  axios
    .get<GetVerifyEmailDTO>(
      `${USER_BASE_URL}/emails/${encodeURIComponent(email)}`,
    )
    .then((res) => GetVerifyEmailSchema.parse(res.data));

export const getVerifyNickname = (nickname: string) =>
  axios
    .get<GetVerifyNicknameDTO>(
      `${USER_BASE_URL}/nicknames/${encodeURIComponent(nickname)}`,
    )
    .then((res) => GetVerifyNicknameSchema.parse(res.data));
