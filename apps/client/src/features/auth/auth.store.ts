import { create } from 'zustand';

interface AuthStore {
  accessToken: string | null;
  isLogin: () => boolean;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: null,
  isLogin: () => get().accessToken !== null,
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAccessToken: () => set({ accessToken: null }),
}));
