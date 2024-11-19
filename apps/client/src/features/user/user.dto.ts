export interface PostUserDTO {
  email: string;
  password: string;
  nickname: string;
}

export interface GetVerifyEmailDTO {
  exists: boolean;
}

export interface GetVerifyNicknameDTO {
  exists: boolean;
}
