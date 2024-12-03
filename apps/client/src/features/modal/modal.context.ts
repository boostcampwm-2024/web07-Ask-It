import { createContext } from 'react';

export interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);
