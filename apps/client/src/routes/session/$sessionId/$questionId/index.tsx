import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { getSessionToken, useSessionStore } from '@/features/session';
import { getChattingList } from '@/features/session/chatting';
import { getQuestions } from '@/features/session/qna';

import { QuestionDetail } from '@/components';

export const Route = createFileRoute('/session/$sessionId/$questionId/')({
  component: QuestionDetail,
  beforeLoad: async ({ params: { sessionId, questionId } }) => {
    const {
      reset,
      setSessionId,
      setSessionToken,
      setIsHost,
      setExpired,
      setSessionTitle,
      setSelectedQuestionId,
      addQuestion,
      fromDetail,
      setFromDetail,
      addChatting,
    } = useSessionStore.getState();
    const { isLogin, setAuthInformation } = useAuthStore.getState();

    if (fromDetail) {
      return;
    }

    try {
      if (!isLogin()) {
        const res = await refresh();
        setAuthInformation(res);
      }
    } catch (error) {
      console.error(error);
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
      setSelectedQuestionId(Number(questionId));
      setFromDetail(true);
      response.questions.forEach(addQuestion);

      if (response.questions.every((question) => question.questionId !== Number(questionId))) {
        throw redirect({ to: `/session/${sessionId}` });
      }

      const { chats } = await getChattingList(token, sessionId);
      chats.reverse().forEach(addChatting);
    } catch (e) {
      console.error(e);
      if (isRedirect(e)) throw e;
      throw redirect({ to: '/' });
    }
  },
});
