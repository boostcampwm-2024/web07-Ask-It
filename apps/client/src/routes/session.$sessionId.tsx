import { createFileRoute } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { getSessionToken, useSessionStore } from '@/features/session';
import { getQuestions } from '@/features/session/qna';
import { useToastStore } from '@/features/toast';
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

    try {
      const { token } = await getSessionToken(sessionId);
      useSessionStore.getState().setSessionId(sessionId);
      useSessionStore.getState().setSessionToken(token);

      const response = await getQuestions({ sessionId, token });
      useSessionStore.getState().setIsHost(response.isHost);
      useSessionStore.getState().setExpired(response.expired);
      useSessionStore.getState().setSessionTitle(response.sessionTitle);
      response.questions.forEach((question) => {
        useSessionStore.getState().addQuestion(question);
      });
      useToastStore.getState().addToast({
        type: 'SUCCESS',
        message: '질문 목록을 불러왔습니다.',
        duration: 3000,
      });
    } catch (e) {
      window.location.href = '/';
    }
  },
});
