import { z } from 'zod';

export const ChatSchema = z.object({
  chattingId: z.number(),
  content: z.string(),
  nickname: z.string(),
});

export type Chat = z.infer<typeof ChatSchema>;
