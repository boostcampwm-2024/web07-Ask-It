import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

export interface QnAContextProps {
  selectedQuestionId: number | null;
  handleSelectQuestionId: (questionId: number | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const QnAContext = createContext<QnAContextProps | undefined>(undefined);

export function QnAContextProvider({ children }: PropsWithChildren) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  );

  const handleSelectQuestionId = useCallback((questionId: number | null) => {
    setSelectedQuestionId(questionId);
  }, []);

  const context = useMemo(
    () => ({
      selectedQuestionId,
      handleSelectQuestionId,
    }),
    [selectedQuestionId, handleSelectQuestionId],
  );

  return <QnAContext.Provider value={context}>{children}</QnAContext.Provider>;
}
