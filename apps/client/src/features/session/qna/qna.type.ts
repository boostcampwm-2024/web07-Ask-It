import { Session } from '@/features/session/session.type';

export interface Question {
  id: number;
  sessionId: Session['id'];
  body: string;
  closed: boolean;
  pinned: boolean;
  upvotes: number;
  replies: Reply[];
  user: {
    token: string;
    nickname: string;
  };
  createdAt: string;
}

export interface Reply {
  id: number;
  questionId: Question['id'];
  body: string;
  user: {
    token: string;
    nickname: string;
  };
  upvotes: number;
  createdAt: string;
}
