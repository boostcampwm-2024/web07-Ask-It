export interface Chat {
  id: string;
  body: string;
  user: {
    token: string;
    nickname: string;
  };
}
