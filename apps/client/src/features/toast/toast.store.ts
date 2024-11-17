import { create } from 'zustand';

import { Toast } from '@/features/toast/toast.type';

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => ({ toasts: [...state.toasts, toast] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((t) =>
          t.id === toast.id ? { ...t, isActive: false } : t,
        ),
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== toast.id),
        }));
      }, 300);
    }, toast.duration);
  },
}));
