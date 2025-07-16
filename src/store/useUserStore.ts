import { create } from 'zustand';

interface UserStateTypes {
  accessToken: string | null;
  userName: string | null;
  setAuth: (token: string, name: string) => void;
  setAccessToken: (token: string) => void;
  setUserName: (name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStateTypes>((set) => ({
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  userName:
    typeof window !== 'undefined' ? localStorage.getItem('userName') : null,
  setAuth: (token, name) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', name);
    set({ accessToken: token, userName: name });
  },
  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token);
    set((state) => ({ ...state, accessToken: token }));
  },
  setUserName: (name) => {
    localStorage.setItem('userName', name);
    set((state) => ({ ...state, userName: name }));
  },
  clearUser: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    set({ accessToken: null, userName: null });
  },
}));
