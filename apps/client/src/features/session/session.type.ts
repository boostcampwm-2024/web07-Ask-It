import { z } from 'zod';

export const SessionSchema = z.object({
  sessionId: z.string(),
  title: z.string(),
  expired: z.boolean(),
  createdAt: z.string(),
});

export const UserSchema = z.object({
  userId: z.number(),
  nickname: z.string(),
  isHost: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;
export type User = z.infer<typeof UserSchema>;
