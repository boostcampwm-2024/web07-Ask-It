import { createFileRoute } from '@tanstack/react-router';

import { QuestionList } from '@/components';
import { refresh, useAuthStore } from '@/features/auth';
import { getSessionToken, useSessionStore } from '@/features/session';
import { getQuestions } from '@/features/session/qna';

export const Route = createFileRoute('/session/$sessionId/')({
  component: QuestionList,
  beforeLoad: async ({ params: { sessionId } }) => {
    const {
      reset,
      setSessionId,
      setSessionToken,
      setIsHost,
      setExpired,
      setSessionTitle,
      addQuestion,
      fromDetail,
      setFromDetail,
    } = useSessionStore.getState();
    const { isLogin, setAccessToken } = useAuthStore.getState();

    if (fromDetail) {
      setFromDetail(false);
      return;
    }

    try {
      if (!isLogin()) {
        const res = await refresh();
        setAccessToken(res.accessToken);
      }
    } catch (error) {
      console.log(error);
    }

    reset();

    try {
      const { token } = await getSessionToken(sessionId);
      setSessionId(sessionId);
      setSessionToken(token);

      const response = await getQuestions({ sessionId, token });
      setIsHost(response.isHost);
      setExpired(response.expired);
      setSessionTitle(response.sessionTitle);
      response.questions.forEach((question) => {
        addQuestion(question);
      });
    } catch (e) {
      window.location.href = '/';
    }
  },
});