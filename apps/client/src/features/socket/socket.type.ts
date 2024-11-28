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

export const QuestionCreatedEventPayloadSchema = z.object({
  question: QuestionSchema,
});

export const QuestionUpdatedEventPayloadSchema = z.object({
  question: z.object({
    questionId: z.number(),
    createUserToken: z.string(),
    sessionId: z.string(),
    body: z.string(),
    closed: z.boolean(),
    pinned: z.boolean(),
    createdAt: z.string(),
  }),
});

export const QuestionDeletedEventPayloadSchema = z.object({
  questionId: z.number(),
});

export const QuestionLikedEventPayloadSchema = z.object({
  questionId: z.number(),
  liked: z.boolean(),
  likesCount: z.number(),
});

export const ReplyCreatedEventPayloadSchema = z.object({
  reply: ReplySchema.extend({
    questionId: z.number(),
  }),
});

export const ReplyUpdatedEventPayloadSchema = z.object({
  reply: z.object({
    replyId: z.number(),
    createUserToken: z.string(),
    sessionId: z.string(),
    questionId: z.number(),
    body: z.string(),
    createdAt: z.string(),
    deleted: z.boolean(),
  }),
});

export const ReplyDeletedEventPayloadSchema = z.object({
  questionId: z.number(),
  replyId: z.number(),
});

export const ReplyLikedEventPayloadSchema = z.object({
  questionId: z.number(),
  replyId: z.number(),
  liked: z.boolean(),
  likesCount: z.number(),
});

export const ChatMessageEventPayloadSchema = z.object({
  chattingId: z.number(),
  content: z.string(),
  nickname: z.string(),
});

export const ChatErrorEventPayloadSchema = z.object({
  message: z.string(),
  error: z.string(),
});

export const ParticipantCountUpdatedEventPayloadSchema = z.object({
  participantCount: z.number(),
});

export const HostChangedEventPayloadSchema = z.object({
  user: UserSchema,
});

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
