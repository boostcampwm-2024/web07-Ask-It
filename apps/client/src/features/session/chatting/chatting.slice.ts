import { StateCreator } from 'zustand';

import { Chat } from '@/features/session/chatting';

export interface ChattingSlice {
  chatting: Chat[];
  addChatting: (chat: Chat) => void;
}

export const createChattingSlice: StateCreator<
  ChattingSlice,
  [],
  [],
  ChattingSlice
> = (set) => ({
  chatting: [],
  addChatting: (chat) =>
    set((state) => ({ chatting: [...state.chatting, chat] })),
});
