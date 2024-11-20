import { io, Socket } from 'socket.io-client';

import { useSessionStore } from '@/features/session';
import {
  QuestionCreatedEventPayload,
  QuestionDeletedEventPayload,
  QuestionLikedEventPayload,
  QuestionUpdatedEventPayload,
  ReplyCreatedEventPayload,
  ReplyDeletedEventPayload,
  ReplyLikedEventPayload,
  ReplyUpdatedEventPayload,
} from '@/features/socket/socket.type';

export class SocketService {
  private socket: Socket;

  constructor(sessionId: string, token: string) {
    this.socket = io(import.meta.env.VITE_SOCKET_URL, {
      query: {
        sessionId,
        token,
      },
    });
  }

  public setupSubscriptions() {
    const store = useSessionStore.getState();

    this.socket.on(
      'questionCreated',
      (payload: QuestionCreatedEventPayload['payload']) => {
        store.addQuestion({ ...payload.question, isOwner: false });
      },
    );

    this.socket.on(
      'questionUpdated',
      (payload: QuestionUpdatedEventPayload['payload']) => {
        store.updateQuestion(payload.question);
      },
    );

    this.socket.on(
      'questionDeleted',
      (payload: QuestionDeletedEventPayload['payload']) => {
        store.removeQuestion(payload.questionId);
      },
    );

    this.socket.on(
      'questionLiked',
      (payload: QuestionLikedEventPayload['payload']) => {
        store.updateQuestion({
          questionId: payload.questionId,
          likesCount: payload.likesCount,
        });
      },
    );

    this.socket.on(
      'replyCreated',
      (payload: ReplyCreatedEventPayload['payload']) => {
        store.addReply(payload.reply.questionId, {
          ...payload.reply,
          isOwner: false,
        });
      },
    );

    this.socket.on(
      'replyUpdated',
      (payload: ReplyUpdatedEventPayload['payload']) => {
        store.updateReply(payload.reply.questionId, payload.reply);
      },
    );

    this.socket.on(
      'replyDeleted',
      (payload: ReplyDeletedEventPayload['payload']) => {
        store.updateReply(payload.questionId, {
          replyId: payload.replyId,
          deleted: true,
        });
      },
    );

    this.socket.on(
      'replyLiked',
      (payload: ReplyLikedEventPayload['payload']) => {
        store.updateReply(payload.questionId, {
          replyId: payload.replyId,
          likesCount: payload.likesCount,
        });
      },
    );
  }

  public disconnect() {
    this.socket.disconnect();
  }
}
