import { z } from 'zod';

import { QuestionSchema } from '@/features/session/qna/qna.type';

export const GetQuestionsRequestSchema = z.object({
  sessionId: z.string(),
  token: z.string().optional(),
});

export const GetQuestionsResponseSchema = z.object({
  questions: z.array(QuestionSchema),
  isHost: z.boolean(),
  expired: z.boolean(),
  sessionTitle: z.string(),
});

export const PostQuestionRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  body: z.string().min(1),
});

export const PostQuestionResponseSchema = z.object({
  question: QuestionSchema,
});

export const PatchQuestionBodyRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  body: z.string().min(1),
});

export const PatchQuestionBodyResponseSchema = z.object({
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

export const DeleteQuestionRequestSchema = z.object({
  sessionId: z.string(),
  token: z.string(),
});

export const PatchQuestionPinnedRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  pinned: z.boolean(),
});

export const PatchQuestionPinnedResponseSchema = z.object({
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

export const PatchQuestionClosedRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  closed: z.boolean(),
});

export const PatchQuestionClosedResponseSchema = z.object({
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

export const PostQuestionLikeRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
});

export const PostQuestionLikeResponseSchema = z.object({
  liked: z.boolean(),
  likesCount: z.number(),
});

export const PostReplyRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  questionId: z.number(),
  body: z.string().min(1),
});

export const PostReplyResponseSchema = z.object({
  reply: z.object({
    replyId: z.number(),
    body: z.string(),
    createdAt: z.string(),
    isOwner: z.boolean(),
    likesCount: z.number(),
    liked: z.boolean(),
    nickname: z.string(),
    isHost: z.boolean(),
  }),
});

export const PatchReplyBodyRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  body: z.string().min(1),
});

export const PatchReplyBodyResponseSchema = z.object({
  reply: z.object({
    replyId: z.number(),
    createUserToken: z.string(),
    sessionId: z.string(),
    questionId: z.number(),
    body: z.string(),
    createdAt: z.string(),
  }),
});

export const DeleteReplyRequestSchema = z.object({
  sessionId: z.string(),
  token: z.string(),
});

export const PostReplyLikeRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
});

export const PostReplyLikeResponseSchema = z.object({
  liked: z.boolean(),
  likesCount: z.number(),
});

export type GetQuestionsRequestDTO = z.infer<typeof GetQuestionsRequestSchema>;
export type GetQuestionsResponseDTO = z.infer<
  typeof GetQuestionsResponseSchema
>;
export type PostQuestionRequestDTO = z.infer<typeof PostQuestionRequestSchema>;
export type PostQuestionResponseDTO = z.infer<
  typeof PostQuestionResponseSchema
>;
export type PatchQuestionBodyRequestDTO = z.infer<
  typeof PatchQuestionBodyRequestSchema
>;
export type PatchQuestionBodyResponseDTO = z.infer<
  typeof PatchQuestionBodyResponseSchema
>;
export type DeleteQuestionRequestDTO = z.infer<
  typeof DeleteQuestionRequestSchema
>;
export type PatchQuestionPinnedRequestDTO = z.infer<
  typeof PatchQuestionPinnedRequestSchema
>;
export type PatchQuestionPinnedResponseDTO = z.infer<
  typeof PatchQuestionPinnedResponseSchema
>;
export type PatchQuestionClosedRequestDTO = z.infer<
  typeof PatchQuestionClosedRequestSchema
>;
export type PatchQuestionClosedResponseDTO = z.infer<
  typeof PatchQuestionClosedResponseSchema
>;
export type PostQuestionLikeRequestDTO = z.infer<
  typeof PostQuestionLikeRequestSchema
>;
export type PostQuestionLikeResponseDTO = z.infer<
  typeof PostQuestionLikeResponseSchema
>;
export type PostReplyRequestDTO = z.infer<typeof PostReplyRequestSchema>;
export type PostReplyResponseDTO = z.infer<typeof PostReplyResponseSchema>;
export type PatchReplyBodyRequestDTO = z.infer<
  typeof PatchReplyBodyRequestSchema
>;
export type PatchReplyBodyResponseDTO = z.infer<
  typeof PatchReplyBodyResponseSchema
>;
export type DeleteReplyRequestDTO = z.infer<typeof DeleteReplyRequestSchema>;
export type PostReplyLikeRequestDTO = z.infer<
  typeof PostReplyLikeRequestSchema
>;
export type PostReplyLikeResponseDTO = z.infer<
  typeof PostReplyLikeResponseSchema
>;
