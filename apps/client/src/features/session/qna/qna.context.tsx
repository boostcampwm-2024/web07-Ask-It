import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

export interface QnAContextProps {
  selectedQuestion: number | null;
  handleSelectQuestion: (questionId: number | null) => void;
}

export const QnAContext = createContext<QnAContextProps | undefined>(undefined);

export function QnAContextProvider({ children }: PropsWithChildren) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleSelectQuestion = useCallback((questionId: number | null) => {
    setSelectedQuestion(questionId);
  }, []);

  const context = useMemo(
    () => ({ selectedQuestion, handleSelectQuestion }),
    [selectedQuestion, handleSelectQuestion],
  );

  return <QnAContext.Provider value={context}>{children}</QnAContext.Provider>;
}
