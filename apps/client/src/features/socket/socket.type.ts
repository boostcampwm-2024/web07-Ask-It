import { Question, Reply } from '@/features/session/qna';

export type SocketEventType =
  | 'questionCreated'
  | 'questionUpdated'
  | 'questionDeleted'
  | 'questionLiked'
  | 'replyCreated'
  | 'replyUpdated'
  | 'replyDeleted'
  | 'replyLiked';

export interface SocketEventPayload {
  type: SocketEventType;
  payload: unknown;
}

export interface QuestionCreatedEventPayload extends SocketEventPayload {
  type: 'questionCreated';
  payload: {
    question: Question;
  };
}

export interface QuestionUpdatedEventPayload extends SocketEventPayload {
  type: 'questionUpdated';
  payload: {
    question: {
      questionId: string;
      createUserToken: string;
      sessionId: string;
      body: string;
      closed: boolean;
      pinned: boolean;
      createdAt: string;
    };
  };
}

export interface QuestionDeletedEventPayload extends SocketEventPayload {
  type: 'questionDeleted';
  payload: {
    questionId: string;
  };
}

export interface QuestionLikedEventPayload extends SocketEventPayload {
  type: 'questionLiked';
  payload: {
    questionId: string;
    liked: boolean;
    likesCount: number;
  };
}

export interface ReplyCreatedEventPayload extends SocketEventPayload {
  type: 'replyCreated';
  payload: {
    reply: Reply;
  };
}

export interface ReplyUpdatedEventPayload extends SocketEventPayload {
  type: 'replyUpdated';
  payload: {
    reply: {
      replyId: string;
      createUserToken: string;
      sessionId: string;
      questionId: string;
      body: string;
      createdAt: string;
      deleted: boolean;
    };
  };
}

export interface ReplyDeletedEventPayload extends SocketEventPayload {
  type: 'replyDeleted';
  payload: {
    replyId: string;
  };
}

export interface ReplyLikedEventPayload extends SocketEventPayload {
  type: 'replyLiked';
  payload: {
    replyId: string;
    liked: boolean;
    likesCount: number;
  };
}
