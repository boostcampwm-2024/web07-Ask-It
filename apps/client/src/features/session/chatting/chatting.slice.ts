import { StateCreator } from 'zustand';

import { Chat } from '@/features/session/chatting';

export interface ChattingSlice {
  chatting: Chat[];
  resetChatting: () => void;
  addChatting: (chat: Chat) => void;
  addChattingToFront: (chat: Chat) => void;
}

export const createChattingSlice: StateCreator<ChattingSlice, [], [], ChattingSlice> = (set) => ({
  chatting: [],
  resetChatting: () => set({ chatting: [] }),
  addChatting: (chat) => set((state) => ({ chatting: [...state.chatting, chat] })),
  addChattingToFront: (chat) => set((state) => ({ chatting: [chat, ...state.chatting] })),
});
