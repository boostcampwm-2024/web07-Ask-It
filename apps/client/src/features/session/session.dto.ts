import { z } from 'zod';

import { UserSchema } from '@/features/session/session.type';

export const PostSessionRequestSchema = z.object({
  title: z.string().min(1),
});

export const PostSessionResponseSchema = z.object({
  sessionId: z.string(),
});

export const GetSessionsResponseSchema = z.object({
  sessionData: z.array(
    z.object({
      sessionId: z.string(),
      title: z.string(),
      createdAt: z.object({
        year: z.number(),
        month: z.number(),
        date: z.number(),
      }),
      expired: z.boolean(),
    }),
  ),
});

export const GetSessionTokenResponseSchema = z.object({
  token: z.string(),
});

export const GetSessionUsersRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
});

export const GetSessionUsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

export const PatchSessionHostRequestSchema = z.object({
  token: z.string(),
  sessionId: z.string(),
  isHost: z.boolean(),
});

export const PatchSessionHostResponseSchema = z.object({
  user: UserSchema,
});

export type PostSessionRequestDTO = z.infer<typeof PostSessionRequestSchema>;
export type PostSessionResponseDTO = z.infer<typeof PostSessionResponseSchema>;
export type GetSessionsResponseDTO = z.infer<typeof GetSessionsResponseSchema>;
export type GetSessionTokenResponseDTO = z.infer<
  typeof GetSessionTokenResponseSchema
>;
export type GetSessionUsersRequestDTO = z.infer<
  typeof GetSessionUsersRequestSchema
>;
export type GetSessionUsersResponseDTO = z.infer<
  typeof GetSessionUsersResponseSchema
>;
export type PatchSessionHostRequestDTO = z.infer<
  typeof PatchSessionHostRequestSchema
>;
export type PatchSessionHostResponseDTO = z.infer<
  typeof PatchSessionHostResponseSchema
>;
