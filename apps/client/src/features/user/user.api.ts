import axios from 'axios';

import {
  GetVerifyEmailRequestSchema,
  GetVerifyEmailResponseDTO,
  GetVerifyEmailResponseSchema,
  GetVerifyNicknameRequestSchema,
  GetVerifyNicknameResponseDTO,
  GetVerifyNicknameResponseSchema,
  PostUserDTO,
  PostUserSchema,
} from '@/features/user/user.dto';

export const postUser = (body: PostUserDTO) => axios.post('/api/users', PostUserSchema.parse(body));

export const getVerifyEmail = (email: string) =>
  axios
    .get<GetVerifyEmailResponseDTO>(`/api/users/emails/${encodeURIComponent(GetVerifyEmailRequestSchema.parse(email))}`)
    .then((res) => GetVerifyEmailResponseSchema.parse(res.data));

export const getVerifyNickname = (nickname: string) =>
  axios
    .get<GetVerifyNicknameResponseDTO>(
      `/api/users/nicknames/${encodeURIComponent(GetVerifyNicknameRequestSchema.parse(nickname))}`,
    )
    .then((res) => GetVerifyNicknameResponseSchema.parse(res.data));
