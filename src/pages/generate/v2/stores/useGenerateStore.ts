import { create } from 'zustand';

// LoadingPage의 이미지 생성 mutation 응답에서 ResultPage 진입에 필요한 데이터
interface NavigationData {
  imageId: number;
  imageUrl: string;
  isMirror: boolean;
}

interface GenerateState {
  isApiCompleted: boolean;
  navigationData: NavigationData | null;
  setApiCompleted: (completed: boolean) => void;
  setNavigationData: (data: NavigationData) => void;
  resetGenerate: () => void;
}

export const useGenerateStore = create<GenerateState>((set) => ({
  isApiCompleted: false,
  navigationData: null,
  setApiCompleted: (completed) => set({ isApiCompleted: completed }),
  setNavigationData: (data) => set({ navigationData: data }),
  resetGenerate: () => set({ isApiCompleted: false, navigationData: null }),
}));
