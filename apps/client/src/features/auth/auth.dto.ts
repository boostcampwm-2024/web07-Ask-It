import { ErrorDTO, SuccessDTO } from '@/shared';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export type LoginResponseDTO =
  | SuccessDTO<{
      accessToken: string;
    }>
  | ErrorDTO;

export type RefreshResponseDTO =
  | SuccessDTO<{
      accessToken: string;
    }>
  | ErrorDTO;
