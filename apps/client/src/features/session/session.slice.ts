import { QnASlice } from 'src/features/session/qna';
import { StateCreator } from 'zustand/index';

import { ChattingSlice } from '@/features/session/chatting';
import { User } from '@/features/session/session.type';

export interface SessionSlice {
  sessionId?: string;
  sessionToken?: string;
  isHost: boolean;
  expired: boolean;
  sessionTitle?: string;
  fromDetail: boolean;
  selectedQuestionId?: number;
  sessionUsers: User[];
  participantCount: number;
  reset: () => void;
  setSessionId: (sessionId: string) => void;
  setSessionToken: (sessionToken: string) => void;
  setIsHost: (isHost: boolean) => void;
  setExpired: (expired: boolean) => void;
  setSessionTitle: (sessionTitle: string) => void;
  setFromDetail: (fromDetail: boolean) => void;
  setSelectedQuestionId: (selectedQuestionId?: number) => void;
  setSessionUsers: (sessionUsers: User[]) => void;
  updateSessionUser: (user: Partial<Omit<User, 'userId'>> & { userId: number }) => void;
  setParticipantCount: (participantCount: number) => void;
}

export const createSessionSlice: StateCreator<SessionSlice & QnASlice & ChattingSlice, [], [], SessionSlice> = (
  set,
  get,
) => ({
  isHost: false,
  expired: false,
  fromDetail: false,
  sessionUsers: [],
  participantCount: 0,
  reset: () => {
    get().resetQuestions();
    get().resetChatting();
    set({
      sessionToken: undefined,
      isHost: false,
      expired: false,
      sessionTitle: undefined,
      fromDetail: false,
      selectedQuestionId: undefined,
      sessionUsers: [],
      participantCount: 0,
    });
  },
  setSessionId: (sessionId) => set({ sessionId }),
  setSessionToken: (sessionToken) => set({ sessionToken }),
  setIsHost: (isHost) => set({ isHost }),
  setExpired: (expired) => set({ expired }),
  setSessionTitle: (sessionTitle) => set({ sessionTitle }),
  setFromDetail: (fromDetail) => set({ fromDetail }),
  setSelectedQuestionId: (selectedQuestionId) => set({ selectedQuestionId }),
  setSessionUsers: (sessionUsers) =>
    set({
      sessionUsers: sessionUsers.sort((a, b) => {
        if (a.isHost && !b.isHost) return -1;
        if (!a.isHost && b.isHost) return 1;
        return a.nickname.localeCompare(b.nickname);
      }),
    }),
  updateSessionUser: (user) =>
    set((state) => ({
      ...state,
      sessionUsers: state.sessionUsers
        .map((u) => (u.userId === user.userId ? { ...u, ...user } : u))
        .sort((a, b) => {
          if (a.isHost && !b.isHost) return -1;
          if (!a.isHost && b.isHost) return 1;
          return a.nickname.localeCompare(b.nickname);
        }),
    })),
  setParticipantCount: (participantCount) => set({ participantCount }),
});
