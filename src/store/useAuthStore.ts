import { create } from 'zustand';

// 인증 상태를 관리하는 zustand 스토어 인터페이스
interface AuthState {
  accessToken: string | null; // 액세스 토큰 (로그인 시 발급, 없으면 null)
  setAccessToken: (token: string) => void; // 액세스 토큰 저장 함수
  clearAuth: () => void; // 인증 정보 초기화 함수
}

// zustand를 사용한 인증 상태 전역 관리
export const useAuthStore = create<AuthState>((set) => ({
  // 앱 시작 시 localStorage에서 accessToken을 불러와 초기화
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  // accessToken을 localStorage와 zustand 상태에 모두 저장
  setAccessToken: (token) => {
    try {
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('[AuthStore] localStorage 저장 실패:', error);
    }

    set({ accessToken: token });
  },
  // 인증 정보(토큰) 삭제 및 상태 초기화
  clearAuth: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null });
  },
}));
