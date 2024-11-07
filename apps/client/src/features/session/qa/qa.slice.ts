import { StateCreator } from 'zustand/index';

import { Question, Reply } from '@/features/session/qa/qa.type';

export interface QASlice {
  questions: Question[];
  resetQuestions: () => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  removeQuestion: (questionId: Question['id']) => void;
  upvoteQuestion: (questionId: Question['id']) => void;
  addReply: (reply: Reply) => void;
  updateReply: (reply: Reply) => void;
  removeReply: (replyId: Reply['id']) => void;
  upvoteReply: (replyId: Reply['id']) => void;
}

export const createQASlice: StateCreator<QASlice, [], [], QASlice> = (set) => ({
  questions: [],
  resetQuestions: () => set({ questions: [] }),
  addQuestion: (question) =>
    set((state) => ({ ...state, questions: [...state.questions, question] })),
  updateQuestion: (question) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.id === question.id ? question : q,
      ),
    })),
  removeQuestion: (questionId) =>
    set((state) => ({
      ...state,
      questions: state.questions.filter((q) => q.id !== questionId),
    })),
  upvoteQuestion: (questionId) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q,
      ),
    })),
  addReply: (reply) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.id === reply.questionId
          ? { ...q, replies: [...q.replies, reply] }
          : q,
      ),
    })),
  updateReply: (reply) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.id === reply.questionId
          ? {
              ...q,
              replies: q.replies.map((r) => (r.id === reply.id ? reply : r)),
            }
          : q,
      ),
    })),
  removeReply: (replyId) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) => ({
        ...q,
        replies: q.replies.filter((r) => r.id !== replyId),
      })),
    })),
  upvoteReply: (replyId) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) => ({
        ...q,
        replies: q.replies.map((r) =>
          r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r,
        ),
      })),
    })),
});
