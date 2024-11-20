export interface Reply {
  replyId: number;
  body: string;
  createdAt: string;
  isOwner: boolean;
  likesCount: number;
  liked: boolean;
  nickname: string;
  isHost: boolean;
  deleted: boolean;
}

export interface Question {
  questionId: number;
  sessionId: string;
  body: string;
  closed: boolean;
  pinned: boolean;
  createdAt: string;
  isOwner: boolean;
  likesCount: number;
  liked: boolean;
  nickname: string;
  isHost: false;
  replies: Reply[];
}
