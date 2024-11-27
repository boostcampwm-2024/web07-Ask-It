import { z } from 'zod';

export const ReplySchema = z.object({
  replyId: z.number(),
  userId: z.number().optional(),
  body: z.string(),
  createdAt: z.string(),
  isOwner: z.boolean(),
  likesCount: z.number(),
  liked: z.boolean(),
  deleted: z.boolean(),
  nickname: z.string(),
  isHost: z.boolean(),
});

export const QuestionSchema = z.object({
  questionId: z.number(),
  sessionId: z.string(),
  body: z.string(),
  closed: z.boolean(),
  pinned: z.boolean(),
  createdAt: z.string(),
  isOwner: z.boolean(),
  likesCount: z.number(),
  liked: z.boolean(),
  nickname: z.string(),
  replies: z.array(ReplySchema),
});

export type Reply = z.infer<typeof ReplySchema>;
export type Question = z.infer<typeof QuestionSchema>;
