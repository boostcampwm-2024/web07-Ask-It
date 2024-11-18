export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
}

export interface RefreshResponseDTO {
  accessToken: string;
}
