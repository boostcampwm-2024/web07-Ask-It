import { z } from 'zod';

import { ChatSchema } from '@/features/session/chatting/chatting.type';

export const GetChattingListResponseSchema = z.object({
  chats: z.array(ChatSchema),
});

export type GetChattingListResponseDTO = z.infer<typeof GetChattingListResponseSchema>;
