import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AreaType,
  HouseType,
  PrimaryUsage,
  RoomType,
} from '../types/funnel';

interface Step1State {
  houseType?: HouseType;
  roomType?: RoomType;
  areaType?: AreaType;
  houseId?: number;
}

interface Step2State {
  floorPlanId?: number;
  isMirror?: boolean;
}

interface Step3State {
  moodBoardIds?: number[];
}

interface Step4State {
  primaryUsage?: PrimaryUsage;
  bedTypeId?: number;
  otherFurnitureIds?: number[];
}

interface FunnelStore {
  // 각 스텝의 상태
  step1: Step1State;
  step2: Step2State;
  step3: Step3State;
  step4: Step4State;

  // 현재 스텝
  currentStep: number;

  // 액션
  setStep1Data: (data: Partial<Step1State>) => void;
  setStep2Data: (data: Partial<Step2State>) => void;
  setStep3Data: (data: Partial<Step3State>) => void;
  setStep4Data: (data: Partial<Step4State>) => void;
  setCurrentStep: (step: number) => void;

  // 전체 상태 초기화
  resetFunnel: () => void;

  // 특정 스텝 이후 데이터 초기화 (뒤로가기 시 이후 데이터 클리어)
  clearAfterStep: (step: number) => void;
}

const initialState = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  currentStep: 1,
};

export const useFunnelStore = create<FunnelStore>()(
  persist(
    // 필요하면 get도 선언
    (set) => ({
      ...initialState,

      // state: 퍼널의 전체 데이터(step1,2,3,4) 저장
      setStep1Data: (data) =>
        set((state) => ({
          step1: { ...state.step1, ...data },
        })),

      setStep2Data: (data) =>
        set((state) => ({
          step2: { ...state.step2, ...data },
        })),

      setStep3Data: (data) =>
        set((state) => ({
          step3: { ...state.step3, ...data },
        })),

      setStep4Data: (data) =>
        set((state) => ({
          step4: { ...state.step4, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      resetFunnel: () => {
        set(initialState);
        console.log('reset');
      },

      clearAfterStep: (step) =>
        set((state) => {
          const newState = { ...state };
          if (step < 2) {
            newState.step2 = {};
            newState.step3 = {};
            newState.step4 = {};
          } else if (step < 3) {
            newState.step3 = {};
            newState.step4 = {};
          } else if (step < 4) {
            newState.step4 = {};
          }
          return newState;
        }),
    }),
    {
      name: 'funnel-storage', // sessionStorage 키 이름
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
    /*
        sessionStorage: 탭이 닫히면 데이터가 사라짐
        사용 예시: 사용자가 퍼널 진행 중
          - 실수로 페이지 새로고침 → 데이터 유지됨
          - 브라우저 탭 닫음 → 데이터 사라짐
          - 다른 탭에서 같은 사이트 접속 → 데이터 없음
        
        localStorage: 명시적으로 삭제하거나 브라우저 데이터 삭제할 때까지 영구 저장

        퍼널은 일회성 프로세스이므로 sessionStorage가 적합함
        - 탭 닫으면 자동으로 데이터 정리됨
        - 사용자가 새로운 퍼널을 시작할 때 이전 데이터 방해 안됨
        - 페이지 새로고침 시에만 데이터 유지 (의도된 동작)
        - 다른 탭과 데이터 충돌 없음
        - 브라우저 저장 공간 효율적 사용
    */
  )
);
