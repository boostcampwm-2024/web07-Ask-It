import { useContext } from 'react';

import { QnAContext } from '@/features/session/qna/qna.context';

// eslint-disable-next-line import/prefer-default-export
export const useQnAContext = () => {
  const context = useContext(QnAContext);
  if (!context) {
    throw new Error('useQnAContext must be used within a QnAProvider');
  }
  return context;
};
