import { create } from 'zustand';

interface NameStateTypes {
  userName: string | null;
  setUserName: (name: string) => void;
  clearUserName: () => void;
}

export const useNameStore = create<NameStateTypes>((set) => ({
  userName: null,
  setUserName: (name) => set({ userName: name }),
  clearUserName: () => set({ userName: null }),
}));
