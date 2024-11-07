import { create } from 'zustand';

import {
  ChattingSlice,
  createChattingSlice,
} from '@/features/session/chatting';
import { createQASlice, QASlice } from '@/features/session/qa';
import {
  createSessionSlice,
  SessionSlice,
} from '@/features/session/session.slice';

export type SessionStore = SessionSlice & QASlice & ChattingSlice;

export const useSessionStore = create<SessionStore>()((...a) => ({
  ...createQASlice(...a),
  ...createChattingSlice(...a),
  ...createSessionSlice(...a),
}));
