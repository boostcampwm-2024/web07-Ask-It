import { QnASlice } from 'src/features/session/qna';
import { StateCreator } from 'zustand/index';

import { ChattingSlice } from '@/features/session/chatting';
import { Session } from '@/features/session/session.type';

export interface SessionSlice {
  session?: Session;
  reset: () => void;
  setSession: (session: Session) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice & QnASlice & ChattingSlice,
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
