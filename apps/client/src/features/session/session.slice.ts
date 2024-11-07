import { StateCreator } from 'zustand/index';

import { Session } from '@/features/session/session.type';

export interface SessionSlice {
  session?: Session;
  setSession: (session: Session) => void;
}

export const createSessionSlice: StateCreator<
  SessionSlice,
  [],
  [],
  SessionSlice
> = (set) => ({
  session: undefined,
  setSession: (session) => set({ session }),
});
