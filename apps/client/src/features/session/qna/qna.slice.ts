import { StateCreator } from 'zustand/index';

import { Question, Reply } from '@/features/session/qna/qna.type';

export interface QnASlice {
  questions: Question[];
  resetQuestions: () => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (
    question: Partial<Omit<Question, 'questionId'>> & { questionId: number },
  ) => void;
  removeQuestion: (questionId: Question['questionId']) => void;
  addReply: (questionId: number, reply: Reply) => void;
  updateReply: (
    questionId: number,
    reply: Partial<Omit<Reply, 'replyId'>> & { replyId: number },
  ) => void;
  removeReply: (replyId: Reply['replyId']) => void;
  updateReplyIsHost: (userId: number, isHost: boolean) => void;
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
        q.questionId === question.questionId ? { ...q, ...question } : q,
      ),
    })),
  removeQuestion: (questionId) =>
    set((state) => ({
      ...state,
      questions: state.questions.filter((q) => q.questionId !== questionId),
    })),
  addReply: (questionId, reply) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.questionId === questionId
          ? { ...q, replies: [...q.replies, reply] }
          : q,
      ),
    })),
  updateReply: (questionId, reply) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.questionId === questionId
          ? {
              ...q,
              replies: q.replies.map((r) =>
                r.replyId === reply.replyId ? { ...r, ...reply } : r,
              ),
            }
          : q,
      ),
    })),
  removeReply: (replyId) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) => ({
        ...q,
        replies: q.replies.filter((r) => r.replyId !== replyId),
      })),
    })),
  updateReplyIsHost: (userId, isHost) =>
    set((state) => ({
      ...state,
      questions: state.questions.map((q) => ({
        ...q,
        replies: q.replies.map((r) =>
          r.userId === userId ? { ...r, isHost } : r,
        ),
      })),
    })),
});
