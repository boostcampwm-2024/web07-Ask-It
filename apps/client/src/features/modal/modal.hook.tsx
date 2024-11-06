import { ReactNode, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import Background from '@/features/modal/components/Background';
import { ModalContext } from '@/features/modal/modal.context';

export const useModal = (children: ReactNode) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const contextValue = useMemo(() => ({ openModal, closeModal }), []);

  const Modal = useMemo(() => {
    if (!isOpen) return null;
    return createPortal(
      <ModalContext.Provider value={contextValue}>
        <Background onClick={closeModal}>
          <div
            role='button'
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
          >
            {children}
          </div>
        </Background>
      </ModalContext.Provider>,
      document.body,
    );
  }, [isOpen, children, contextValue]);

  return {
    Modal,
    openModal,
    closeModal,
  };
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
