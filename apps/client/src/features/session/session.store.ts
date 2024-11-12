import { create } from 'zustand';

import {
  ChattingSlice,
  createChattingSlice,
} from '@/features/session/chatting';
import { createQnASlice, QnASlice } from '@/features/session/qna';
import {
  createSessionSlice,
  SessionSlice,
} from '@/features/session/session.slice';

export type SessionStore = SessionSlice & QnASlice & ChattingSlice;

export const useSessionStore = create<SessionStore>()((...a) => ({
  ...createQnASlice(...a),
  ...createChattingSlice(...a),
  ...createSessionSlice(...a),
}));
