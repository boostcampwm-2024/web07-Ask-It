export interface PostLoginRequestDTO {
  email: string;
  password: string;
}

export interface PostLoginResponseDTO {
  accessToken: string;
  userId: number;
}

export interface PostRefreshResponseDTO {
  accessToken: string;
  userId: number;
}
