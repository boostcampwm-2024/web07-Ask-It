import { ChatSchema } from '@/features/session/chatting/chatting.type';
import { z } from 'zod';

export const GetChattingListResponseSchema = z.object({
  chats: z.array(ChatSchema),
});

export type GetChattingListResponseDTO = z.infer<
  typeof GetChattingListResponseSchema
>;
