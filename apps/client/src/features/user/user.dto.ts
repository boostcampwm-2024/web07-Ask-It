export interface CreateUserDTO {
  email: string;
  password: string;
  nickname: string;
}

export interface VerifyEmailDTO {
  exists: boolean;
}

export interface VerifyNicknameDTO {
  exists: boolean;
}
