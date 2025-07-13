import { useState } from 'react';
import {
  HOUSE_INFO_VALIDATION,
  type CompletedHouseInfo,
  type ImageGenerateSteps,
} from '../types/funnel';

interface FormErrors {
  houseType?: string;
  roomType?: string;
  roomSize?: string;
}

export const useHouseInfoStep = (context: ImageGenerateSteps['HouseInfo']) => {
  const [formData, setFormData] = useState({
    houseType: context.houseType,
    roomType: context.roomType,
    roomSize: context.roomSize,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 입력값 3개 입력 여부 확인
  const areAllFieldsFilled = !!(
    formData.houseType &&
    formData.roomType &&
    formData.roomSize
  );

  // 제한된 값(아파트, 투룸 등)을 선택했는지 검증
  const checkRestrictedValues = (): boolean => {
    const newErrors: FormErrors = {};

    if (areAllFieldsFilled) {
      if (
        formData.houseType &&
        HOUSE_INFO_VALIDATION.restrictedValues.houseType.includes(
          formData.houseType
        )
      ) {
        newErrors.houseType = HOUSE_INFO_VALIDATION.messages.houseType;
      }
      if (
        formData.roomType &&
        HOUSE_INFO_VALIDATION.restrictedValues.roomType.includes(
          formData.roomType
        )
      ) {
        newErrors.roomType = HOUSE_INFO_VALIDATION.messages.roomType;
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).length === 0;
  };

  // areAllFieldsFilled == true일 때 버튼 enable -> handleSubmit 실행 가능
  const handleSubmit = (onNext: (data: CompletedHouseInfo) => void) => {
    if (!checkRestrictedValues()) return;

    // 타입 안전성 강화를 위해 타입 단언(as)을 제거 -> 아래 조건문으로 별도의 타입 검사 필요
    if (!formData.houseType || !formData.roomType || !formData.roomSize) {
      console.error('필수 필드가 누락되었습니다');
      return;
    }

    const completedData: CompletedHouseInfo = {
      houseType: formData.houseType,
      roomType: formData.roomType,
      roomSize: formData.roomSize,
    };

    console.log('집 정보 입력 완료: ', completedData);
    onNext(completedData);
  };

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    areAllFieldsFilled,
  };
};
