import { Question, Reply } from '@/features/session/qna';
import { User } from '@/features/session/session.type';

export type SocketEventType =
  | 'questionCreated'
  | 'questionUpdated'
  | 'questionDeleted'
  | 'questionLiked'
  | 'replyCreated'
  | 'replyUpdated'
  | 'replyDeleted'
  | 'replyLiked'
  | 'createChat'
  | 'chatMessage'
  | 'chatError'
  | 'invalidConnection'
  | 'participantCountUpdated'
  | 'hostChanged'
  | 'sessionEnded';

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
      questionId: number;
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
    questionId: number;
  };
}

export interface QuestionLikedEventPayload extends SocketEventPayload {
  type: 'questionLiked';
  payload: {
    questionId: number;
    liked: boolean;
    likesCount: number;
  };
}

export interface ReplyCreatedEventPayload extends SocketEventPayload {
  type: 'replyCreated';
  payload: {
    reply: Reply & { questionId: number };
  };
}

export interface ReplyUpdatedEventPayload extends SocketEventPayload {
  type: 'replyUpdated';
  payload: {
    reply: {
      replyId: number;
      createUserToken: string;
      sessionId: string;
      questionId: number;
      body: string;
      createdAt: string;
      deleted: boolean;
    };
  };
}

export interface ReplyDeletedEventPayload extends SocketEventPayload {
  type: 'replyDeleted';
  payload: {
    questionId: number;
    replyId: number;
  };
}

export interface ReplyLikedEventPayload extends SocketEventPayload {
  type: 'replyLiked';
  payload: {
    questionId: number;
    replyId: number;
    liked: boolean;
    likesCount: number;
  };
}

export interface ChatMessageEventPayload extends SocketEventPayload {
  type: 'chatMessage';
  payload: {
    chattingId: string;
    content: string;
    nickname: string;
  };
}

export interface ChatErrorEventPayload extends SocketEventPayload {
  type: 'chatError';
  payload: {
    message: string;
    error: string;
  };
}

export interface ParticipantCountUpdatedEventPayload
  extends SocketEventPayload {
  type: 'participantCountUpdated';
  payload: {
    participantCount: number;
  };
}

export interface HostChangedEventPayload extends SocketEventPayload {
  type: 'hostChanged';
  payload: {
    user: User;
  };
}
