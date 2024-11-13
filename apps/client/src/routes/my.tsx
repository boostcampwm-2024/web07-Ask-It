import { createFileRoute } from '@tanstack/react-router';

import { MyPage } from '@/pages';

export const Route = createFileRoute('/my')({
  component: MyPage,
});
