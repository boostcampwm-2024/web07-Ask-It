import { useContext } from 'react';

import { QnAContext } from '@/features/session/qna/qna.context';

export const useQnAContext = () => {
  const context = useContext(QnAContext);
  if (!context) {
    throw new Error('useQnAContext must be used within a QnAProvider');
  }
  return context;
};
