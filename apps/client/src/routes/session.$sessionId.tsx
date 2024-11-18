import { createFileRoute } from '@tanstack/react-router';

import { getSessionToken } from '@/features/session';
import { QnAPage } from '@/pages';

export const Route = createFileRoute('/session/$sessionId')({
  component: QnAPage,
  beforeLoad: async ({ params: { sessionId } }) => {
    /**
     * TODO
     * 여기에서 데이터를 가져오고 전역상태로 데이터 이전
     */
    getSessionToken(sessionId);
  },
});
