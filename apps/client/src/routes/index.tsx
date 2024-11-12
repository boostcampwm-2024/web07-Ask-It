import { createFileRoute } from '@tanstack/react-router';

import Home from '@/pages/Home';

// eslint-disable-next-line import/prefer-default-export
export const Route = createFileRoute('/')({
  component: Home,
});
