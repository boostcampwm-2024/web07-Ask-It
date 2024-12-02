import { createFileRoute, redirect } from '@tanstack/react-router';

import { refresh, useAuthStore } from '@/features/auth';
import { getSessionToken, useSessionStore } from '@/features/session';
import { getChattingList } from '@/features/session/chatting';
import { getQuestions } from '@/features/session/qna';

import { QuestionList } from '@/components';

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
      addChatting,
    } = useSessionStore.getState();
    const { isLogin, setAuthInformation } = useAuthStore.getState();

    if (fromDetail) {
      setFromDetail(false);
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
      response.questions.forEach(addQuestion);

      const { chats } = await getChattingList(token, sessionId);
      chats.reverse().forEach(addChatting);
    } catch (e) {
      console.error(e);
      throw redirect({ to: '/' });
    }
  },
});
