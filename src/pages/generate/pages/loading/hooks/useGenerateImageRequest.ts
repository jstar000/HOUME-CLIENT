import { useMemo } from 'react';

import { useGenerateBannerImageMutation } from '@pages/generate/apis/mutations/useGenerateBannerImageMutation';
import { useGenerateFullFunnelImageMutation } from '@pages/generate/apis/mutations/useGenerateFullFunnelImageMutation';
import { useGenerateOtherStyleImageMutation } from '@pages/generate/apis/mutations/useGenerateOtherStyleImageMutation';
import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import { useImageFlowStore } from '@store/useImageFlowStore';

import type {
  BannerGenerateImageRequest,
  GenerateImageV4Request,
  OtherStyleGenerateImageRequest,
} from '@apis/__generated__/data-contracts';

// ReturnType<typeof XxxMutation>['mutate']: 각 mutation 훅이 반환하는 mutate 함수의 타입을 추출하는 코드
// useGenerateImageRequest가 이미지 생성 진입 경로 별로 payload를 조합하고 적절한 mutate 함수를 골라 LoadingPage에 전달 -> LoadingPage에서 mutate(payload)로 호출
type FullFunnelMutate = ReturnType<
  typeof useGenerateFullFunnelImageMutation
>['mutate'];
type BannerMutate = ReturnType<typeof useGenerateBannerImageMutation>['mutate'];
type OtherStyleMutate = ReturnType<
  typeof useGenerateOtherStyleImageMutation
>['mutate'];

// useGenerateImageRequest에서 진입 경로 별로 payload + mutation을 적절히 구성해 반환
// LoadingPage에서 분기 없이 mutate(payload) 한 줄로 이미지 생성 API 호출 가능
export type GenerateImageRequestResult =
  | {
      kind: 'fullFunnel';
      mutate: FullFunnelMutate;
      payload: GenerateImageV4Request;
    }
  | {
      kind: 'banner';
      mutate: BannerMutate;
      payload: BannerGenerateImageRequest;
    }
  | {
      kind: 'otherStyle';
      mutate: OtherStyleMutate;
      payload: OtherStyleGenerateImageRequest;
    }
  | { kind: 'invalid' };

export const useGenerateImageRequest = (): GenerateImageRequestResult => {
  // 이미지 생성 API의 mutate 메서드 가져오기
  const { mutate: mutateFullFunnel } = useGenerateFullFunnelImageMutation();
  const { mutate: mutateBanner } = useGenerateBannerImageMutation();
  const { mutate: mutateOtherStyle } = useGenerateOtherStyleImageMutation();

  // useMemo로 감싸 마운트 시 1회만 이미지 생성 경로 분기 평가 → requestState 객체 ref 고정
  // (store는 getState()로 스냅샷만 읽음, mutate 3개는 React Query가 컴포넌트 동안 같은 메모리 주소를 유지 → deps가 사실상 안 바뀜)
  // → LoadingPage가 requestState를 useEffect 의존성에 넣어도 mutate가 매 렌더 재실행되지 않음
  return useMemo(() => {
    // preset 데이터 가져오기
    const preset = useImageFlowStore.getState().preset;
    // 퍼널 데이터 가져오기 (step1, 2, 3 모두)
    const { floorPlan, moodBoardIds, activityInfo } = useFunnelStore.getState();

    // 모든 이미지 생성 API 요청 필수 값: floorPlan
    if (!floorPlan) return { kind: 'invalid' };

    // 풀퍼널 (preset 없음)
    if (preset === null) {
      const activity = activityInfo?.activity;
      const furnitureIds = activityInfo?.furnitureIds;

      if (
        !Array.isArray(moodBoardIds) ||
        typeof activity !== 'string' ||
        !Array.isArray(furnitureIds)
      ) {
        return { kind: 'invalid' };
      }

      return {
        kind: 'fullFunnel',
        mutate: mutateFullFunnel,
        payload: {
          floorPlanId: floorPlan.floorPlanId,
          floorPlanView: floorPlan.floorPlanView,
          isMirror: floorPlan.isMirror,
          moodBoardIds,
          activity,
          furnitureIds,
        },
      };
    }

    // 배너로 이미지 생성
    if (preset.type === 'banner') {
      return {
        kind: 'banner',
        mutate: mutateBanner,
        payload: {
          bannerId: preset.bannerId,
          answerId: preset.answerId,
          floorPlanId: floorPlan.floorPlanId,
          floorPlanView: floorPlan.floorPlanView,
          isMirror: floorPlan.isMirror,
        },
      };
    }

    // 다른 스타일로 이미지 생성
    if (preset.type === 'style') {
      return {
        kind: 'otherStyle',
        mutate: mutateOtherStyle,
        payload: {
          // 주의: swagger 명세에서 request 네이밍이 styleId가 아니라 bannerId임
          bannerId: preset.styleId,
          floorPlanId: floorPlan.floorPlanId,
          floorPlanView: floorPlan.floorPlanView,
          isMirror: floorPlan.isMirror,
        },
      };
    }

    return { kind: 'invalid' };
  }, [mutateFullFunnel, mutateBanner, mutateOtherStyle]);
};
