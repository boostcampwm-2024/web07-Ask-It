import { z } from 'zod';

import { QuestionSchema, ReplySchema } from '@/features/session/qna';
import { UserSchema } from '@/features/session/session.type';

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

export const SocketEventTypeSchema = z.enum([
  'questionCreated',
  'questionUpdated',
  'questionDeleted',
  'questionLiked',
  'replyCreated',
  'replyUpdated',
  'replyDeleted',
  'replyLiked',
  'createChat',
  'chatMessage',
  'chatError',
  'invalidConnection',
  'participantCountUpdated',
  'hostChanged',
  'sessionEnded',
]);

export const SocketEventPayloadSchema = z.object({
  type: SocketEventTypeSchema,
  payload: z.unknown(),
});

export const QuestionCreatedEventPayloadSchema =
  SocketEventPayloadSchema.extend({
    type: z.literal('questionCreated'),
    payload: z.object({
      question: QuestionSchema,
    }),
  });

export const QuestionUpdatedEventPayloadSchema =
  SocketEventPayloadSchema.extend({
    type: z.literal('questionUpdated'),
    payload: z.object({
      question: z.object({
        questionId: z.number(),
        createUserToken: z.string(),
        sessionId: z.string(),
        body: z.string(),
        closed: z.boolean(),
        pinned: z.boolean(),
        createdAt: z.string(),
      }),
    }),
  });

export const QuestionDeletedEventPayloadSchema =
  SocketEventPayloadSchema.extend({
    type: z.literal('questionDeleted'),
    payload: z.object({
      questionId: z.number(),
    }),
  });

export const QuestionLikedEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('questionLiked'),
  payload: z.object({
    questionId: z.number(),
    liked: z.boolean(),
    likesCount: z.number(),
  }),
});

export const ReplyCreatedEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('replyCreated'),
  payload: z.object({
    reply: ReplySchema.extend({
      questionId: z.number(),
    }),
  }),
});

export const ReplyUpdatedEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('replyUpdated'),
  payload: z.object({
    reply: z.object({
      replyId: z.number(),
      createUserToken: z.string(),
      sessionId: z.string(),
      questionId: z.number(),
      body: z.string(),
      createdAt: z.string(),
      deleted: z.boolean(),
    }),
  }),
});

export const ReplyDeletedEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('replyDeleted'),
  payload: z.object({
    questionId: z.number(),
    replyId: z.number(),
  }),
});

export const ReplyLikedEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('replyLiked'),
  payload: z.object({
    questionId: z.number(),
    replyId: z.number(),
    liked: z.boolean(),
    likesCount: z.number(),
  }),
});

export const ChatMessageEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('chatMessage'),
  payload: z.object({
    chattingId: z.string(),
    content: z.string(),
    nickname: z.string(),
  }),
});

export const ChatErrorEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('chatError'),
  payload: z.object({
    message: z.string(),
    error: z.string(),
  }),
});

export const ParticipantCountUpdatedEventPayloadSchema =
  SocketEventPayloadSchema.extend({
    type: z.literal('participantCountUpdated'),
    payload: z.object({
      participantCount: z.number(),
    }),
  });

export const HostChangedEventPayloadSchema = SocketEventPayloadSchema.extend({
  type: z.literal('hostChanged'),
  payload: z.object({
    user: UserSchema,
  }),
});

export type SocketEventPayload = z.infer<typeof SocketEventPayloadSchema>;
export type QuestionCreatedEventPayload = z.infer<
  typeof QuestionCreatedEventPayloadSchema
>;
export type QuestionUpdatedEventPayload = z.infer<
  typeof QuestionUpdatedEventPayloadSchema
>;
export type QuestionDeletedEventPayload = z.infer<
  typeof QuestionDeletedEventPayloadSchema
>;
export type QuestionLikedEventPayload = z.infer<
  typeof QuestionLikedEventPayloadSchema
>;
export type ReplyCreatedEventPayload = z.infer<
  typeof ReplyCreatedEventPayloadSchema
>;
export type ReplyUpdatedEventPayload = z.infer<
  typeof ReplyUpdatedEventPayloadSchema
>;
export type ReplyDeletedEventPayload = z.infer<
  typeof ReplyDeletedEventPayloadSchema
>;
export type ReplyLikedEventPayload = z.infer<
  typeof ReplyLikedEventPayloadSchema
>;
export type ChatMessageEventPayload = z.infer<
  typeof ChatMessageEventPayloadSchema
>;
export type ChatErrorEventPayload = z.infer<typeof ChatErrorEventPayloadSchema>;
export type ParticipantCountUpdatedEventPayload = z.infer<
  typeof ParticipantCountUpdatedEventPayloadSchema
>;
export type HostChangedEventPayload = z.infer<
  typeof HostChangedEventPayloadSchema
>;
