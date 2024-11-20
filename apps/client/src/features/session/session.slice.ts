import { QnASlice } from 'src/features/session/qna';
import { StateCreator } from 'zustand/index';

import { ChattingSlice } from '@/features/session/chatting';
import { Session } from '@/features/session/session.type';

export interface SessionSlice {
  session?: Session;
  sessionId?: string;
  sessionToken?: string;
  isHost: boolean;
  expired: boolean;
  sessionTitle?: string;
  fromDetail: boolean;
  selectedQuestionId?: number;
  reset: () => void;
  setSession: (session: Session) => void;
  setSessionId: (sessionId: string) => void;
  setSessionToken: (sessionToken: string) => void;
  setIsHost: (isHost: boolean) => void;
  setExpired: (expired: boolean) => void;
  setSessionTitle: (sessionTitle: string) => void;
  setFromDetail: (fromDetail: boolean) => void;
  setSelectedQuestionId: (selectedQuestionId?: number) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice & QnASlice & ChattingSlice,
  [],
  [],
  SessionSlice
> = (set, get) => ({
  isHost: false,
  expired: false,
  fromDetail: false,
  reset: () => {
    get().resetQuestions();
    get().resetChatting();
    set({
      session: undefined,
      sessionToken: undefined,
      isHost: false,
      expired: false,
      sessionTitle: undefined,
      fromDetail: false,
      selectedQuestionId: undefined,
    });
  },
  setSession: (session) => set({ session }),
  setSessionId: (sessionId) => set({ sessionId }),
  setSessionToken: (sessionToken) => set({ sessionToken }),
  setIsHost: (isHost) => set({ isHost }),
  setExpired: (expired) => set({ expired }),
  setSessionTitle: (sessionTitle) => set({ sessionTitle }),
  setFromDetail: (fromDetail) => set({ fromDetail }),
  setSelectedQuestionId: (selectedQuestionId) => set({ selectedQuestionId }),
});
