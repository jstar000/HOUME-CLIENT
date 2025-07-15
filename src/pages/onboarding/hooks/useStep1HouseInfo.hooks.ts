import { useState } from 'react';
import {
  HOUSE_INFO_VALIDATION,
  type CompletedHouseInfo,
  type ImageGenerateSteps,
} from '../types/funnel';
import { useHouseInfoApi } from './useStep1Api.hooks';

interface FormErrors {
  houseType?: string;
  roomType?: string;
  roomSize?: string;
}

export const useStep1HouseInfo = (context: ImageGenerateSteps['HouseInfo']) => {
  const selectHouseInfoRequest = useHouseInfoApi();

  const [formData, setFormData] = useState({
    houseType: context.houseType,
    roomType: context.roomType,
    roomSize: context.roomSize,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 입력값 3개 입력 여부 확인
  const isFormCompleted = !!(
    formData.houseType &&
    formData.roomType &&
    formData.roomSize
  );

  // 제한된 값(아파트, 투룸 등)을 선택했는지 검증
  const checkRestrictedValues = (): boolean => {
    const newErrors: FormErrors = {};

    if (isFormCompleted) {
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

  // isFormCompleted == true일 때 버튼 enable -> handleSubmit 실행 가능
  const handleSubmit = (onNext: (data: CompletedHouseInfo) => void) => {
    const isValidInput = checkRestrictedValues();

    // 타입 안전성 강화를 위해 타입 단언(as)을 제거 -> 아래 조건문으로 별도의 타입 검사 필요
    // 필수 필드가 누락되면 '집 구조 선택하기' 버튼이 disabled되어 handleSubmit이 실행될 수 없으므로 아래 조건문은 항상 통과함
    if (!formData.houseType || !formData.roomType || !formData.roomSize) {
      console.error('필수 필드가 누락되었습니다');
      return;
    }

    // funnel의 context에 넣을 데이터(다음 step으로 전달할 데이터)
    const completedData: CompletedHouseInfo = {
      houseType: formData.houseType,
      roomType: formData.roomType,
      roomSize: formData.roomSize,
    };

    // 집구조 선택 POST API에 전달할 데이터
    const requestData = {
      housingType: completedData.houseType,
      roomType: completedData.roomType,
      areaType: completedData.roomSize,
      isValid: isValidInput,
    };

    selectHouseInfoRequest.mutate(requestData, {
      onSuccess: (res) => {
        if (res) {
          console.log('유효한 주거정보, House ID:', res.houseId);
          onNext(completedData);
        } else {
          console.log('유효하지 않은 주거정보');
        }
      },
    });
  };

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    isFormCompleted,
  };
};
