import { SuccessDTO } from '@/shared';

export interface CreateUserDTO {
  email: string;
  password: string;
  nickname: string;
}

export type VerifyEmailDTO = SuccessDTO<{ exists: boolean }>;

export type VerifyNicknameDTO = SuccessDTO<{ exists: boolean }>;
