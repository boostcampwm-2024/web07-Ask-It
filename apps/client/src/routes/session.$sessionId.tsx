import { createFileRoute } from '@tanstack/react-router';

import QnA from '@/pages/QnA';

// eslint-disable-next-line import/prefer-default-export
export const Route = createFileRoute('/session/$sessionId')({
  component: QnA,
});
