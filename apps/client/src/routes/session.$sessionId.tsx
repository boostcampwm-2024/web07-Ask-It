import { createFileRoute } from '@tanstack/react-router';

import { QnAPage } from '@/pages';

export const Route = createFileRoute('/session/$sessionId')({
  component: QnAPage,
});
