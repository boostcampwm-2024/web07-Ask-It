import { createFileRoute } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { getSessionToken, useSessionStore } from '@/features/session';
import { getQuestions } from '@/features/session/qna';
import { QnAPage } from '@/pages';

export const Route = createFileRoute('/session/$sessionId')({
  component: QnAPage,
  beforeLoad: async ({ params: { sessionId } }) => {
    try {
      if (!useAuthStore.getState().isLogin()) {
        const res = await refresh();
        useAuthStore.getState().setAccessToken(res.accessToken);
      }
    } catch (error) {
      console.log(error);
    }

    useSessionStore.getState().reset();

    const { token } = await getSessionToken(sessionId);
    useSessionStore.getState().setSessionId(sessionId);
    useSessionStore.getState().setSessionToken(token);

    const response = await getQuestions({ sessionId, token });
    useSessionStore.getState().setIsHost(response.isHost);
    useSessionStore.getState().setExpired(response.expired);
    response.questions.forEach((question) => {
      useSessionStore.getState().addQuestion(question);
    });
  },
});
