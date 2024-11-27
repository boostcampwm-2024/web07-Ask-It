export interface Reply {
  replyId: number;
  userId?: number;
  body: string;
  createdAt: string;
  isOwner: boolean;
  likesCount: number;
  liked: boolean;
  deleted: boolean;
  nickname: string;
  isHost: boolean;
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
  replies: Reply[];
}
