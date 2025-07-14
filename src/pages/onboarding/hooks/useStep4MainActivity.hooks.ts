import { useEffect, useState } from 'react';
import {
  allRequiredFurnitures,
  MAIN_ACTIVITY_OPTIONS,
  MAIN_ACTIVITY_VALIDATION,
  type ImageGenerateSteps,
  type OtherFurnitures,
} from '../types/funnel';

// 타입 가드 함수(타입 단언 사용 X)
// 유효한 '주요활동' 카테고리 내의 값인지 체크
const isValidActivityKey = (
  usage: string
): usage is keyof typeof MAIN_ACTIVITY_VALIDATION.combinationRules => {
  // usage is SomeType
  // 이 함수가 true를 반환할 때는 호출부에서 usage를 SomeType으로 간주해도 된다는 것을 TS에게 알려줌
  return usage in MAIN_ACTIVITY_VALIDATION.combinationRules;
  // usage in _: 객체에 해당 key가 있는지 검사, boolean 반환
};

interface FormErrors {
  primaryUsage?: string;
  bedType?: string;
  otherFurnitures?: string;
}

export const useStep4MainActivity = (
  context: ImageGenerateSteps['MainActivity']
) => {
  const [formData, setFormData] = useState({
    primaryUsage: context.primaryUsage,
    bedType: context.bedType,
    otherFurnitures: context.otherFurnitures || [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // 주요활동(휴식형, 재택근무형 등) 변경 시 useEffect() 실행
  // 선택한 주요활동에 매칭되는 필수 가구 자동 선택
  useEffect(() => {
    // 필수 가구 체크
    const requiredFurnitures = getRequiredFurnitures();
    setFormData((prev) => ({
      ...prev,
      otherFurnitures: requiredFurnitures,
    }));
  }, [formData.primaryUsage]);

  // 현재 선택된 활동의 필수 가구 목록 반환
  const getRequiredFurnitures = (): OtherFurnitures[] => {
    if (!formData.primaryUsage || !isValidActivityKey(formData.primaryUsage))
      return [];
    return (
      MAIN_ACTIVITY_VALIDATION.combinationRules[formData.primaryUsage]
        ?.requiredFurnitures || []
    );
  };

  // 현재 선택된 활동의 label 가져오기(휴식형, 재택근무형, 영화감상형, 홈카페형)
  const getCurrentActivityLabel = (): string => {
    if (!formData.primaryUsage) return '';
    const option = Object.values(MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE).find(
      (option) => option.code === formData.primaryUsage
    );
    return option?.label || '';
  };

  // 현재 선택된 활동의 필수 가구들의 label 가져오기(책상, 옷장, 식탁/의자, 소파 등)
  // 필수 가구가 여러 개인 경우도 처리 가능
  const getRequiredFurnitureLabels = (): string[] => {
    const requiredCodes = getRequiredFurnitures();
    return requiredCodes
      .map((code) => {
        const option = Object.values(
          MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES
        ).find((option) => option.code === code);
        return option?.label || '';
      })
      .filter((label) => label !== '');
  };

  // 특정 가구가 현재 활동의 필수 가구인지 확인
  const isRequiredFurniture = (furniture: OtherFurnitures): boolean => {
    return getRequiredFurnitures().includes(furniture);
  };

  const areAllFieldsFilled = !!(
    formData.primaryUsage &&
    formData.bedType &&
    Array.isArray(formData.otherFurnitures) &&
    formData.otherFurnitures.length > 0
  );

  return {
    formData,
    setFormData,
    errors,
    areAllFieldsFilled,
    isRequiredFurniture,
    getCurrentActivityLabel,
    getRequiredFurnitureLabels,
  };
};
