import { Question } from '@/features/session/qna/qna.type';

export interface GetQuestionsRequestDTO {
  sessionId: string;
  token?: string;
}

export interface GetQuestionsResponseDTO {
  questions: Question[];
  isHost: boolean;
  expired: boolean;
  sessionTitle: string;
}

export interface PostQuestionRequestDTO {
  token: string;
  sessionId: string;
  body: string;
}

export interface PostQuestionResponseDTO {
  question: Question;
}

export interface PatchQuestionBodyRequestDTO {
  token: string;
  sessionId: string;
  body: string;
}

export interface PatchQuestionBodyResponseDTO {
  question: {
    questionId: number;
    createUserToken: string;
    sessionId: string;
    body: string;
    closed: boolean;
    pinned: boolean;
    createdAt: string;
  };
}

export interface DeleteQuestionRequestDTO {
  sessionId: string;
  token: string;
}

export interface PatchQuestionPinnedRequestDTO {
  token: string;
  sessionId: string;
  pinned: boolean;
}

export interface PatchQuestionPinnedResponseDTO {
  question: {
    questionId: number;
    createUserToken: string;
    sessionId: string;
    body: string;
    closed: boolean;
    pinned: boolean;
    createdAt: string;
  };
}

export interface PatchQuestionClosedRequestDTO {
  token: string;
  sessionId: string;
  closed: boolean;
}

export interface PatchQuestionClosedResponseDTO {
  question: {
    questionId: number;
    createUserToken: string;
    sessionId: string;
    body: string;
    closed: boolean;
    pinned: boolean;
    createdAt: string;
  };
}

export interface PostQuestionLikeRequestDTO {
  token: string;
  sessionId: string;
}

export interface PostQuestionLikeResponseDTO {
  liked: boolean;
  likesCount: number;
}

export interface PostReplyRequestDTO {
  token: string;
  sessionId: string;
  questionId: number;
  body: string;
}

export interface PostReplyResponseDTO {
  reply: {
    replyId: number;
    body: string;
    createdAt: string;
    isOwner: boolean;
    likesCount: number;
    liked: boolean;
    nickname: string;
    isHost: boolean;
  };
}

export interface PatchReplyBodyRequestDTO {
  token: string;
  sessionId: string;
  body: string;
}

export interface PatchReplyBodyResponseDTO {
  reply: {
    replyId: number;
    createUserToken: string;
    sessionId: string;
    questionId: number;
    body: string;
    createdAt: string;
  };
}

export interface DeleteReplyRequestDTO {
  sessionId: string;
  token: string;
}

export interface PostReplyLikeRequestDTO {
  token: string;
  sessionId: string;
}

export interface PostReplyLikeResponseDTO {
  liked: boolean;
  likesCount: number;
}
