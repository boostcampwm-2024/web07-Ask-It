export interface PostLoginRequestDTO {
  email: string;
  password: string;
}

export interface PostLoginResponseDTO {
  accessToken: string;
}

export interface PostRefreshResponseDTO {
  accessToken: string;
}
