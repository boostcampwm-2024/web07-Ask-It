import { StateCreator } from 'zustand/index';

import { ChattingSlice } from '@/features/session/chatting';
import { QASlice } from '@/features/session/qa';
import { Session } from '@/features/session/session.type';

export interface SessionSlice {
  session?: Session;
  reset: () => void;
  setSession: (session: Session) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice & QASlice & ChattingSlice,
  [],
  [],
  SessionSlice
> = (set, get) => ({
  session: undefined,
  reset: () => {
    get().resetQuestions();
    get().resetChatting();
    set({ session: undefined });
  },
  setSession: (session) => set({ session }),
});
