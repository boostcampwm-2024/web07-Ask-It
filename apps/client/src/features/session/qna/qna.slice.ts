import { StateCreator } from 'zustand/index';

import { Question, Reply } from '@/features/session/qna/qna.type';

export interface QnASlice {
  questions: Question[];
  resetQuestions: () => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  removeQuestion: (question: Question) => void;
  upvoteQuestion: (question: Question) => void;
  addReply: (reply: Reply) => void;
  updateReply: (reply: Reply) => void;
  removeReply: (reply: Reply) => void;
  upvoteReply: (reply: Reply) => void;
}

export const createQnASlice: StateCreator<QnASlice, [], [], QnASlice> = (
  set,
) => ({
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
  removeQuestion: (question) =>
    set((state) => ({
      ...state,
      questions: state.questions.filter((q) => q.id !== question.id),
    })),
  upvoteQuestion: (question) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.id === question.id ? { ...q, upvotes: q.upvotes + 1 } : q,
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
  removeReply: (reply) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) => ({
        ...q,
        replies: q.replies.filter((r) => r.id !== reply.id),
      })),
    })),
  upvoteReply: (reply) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) => ({
        ...q,
        replies: q.replies.map((r) =>
          r.id === reply.id ? { ...r, upvotes: r.upvotes + 1 } : r,
        ),
      })),
    })),
});
