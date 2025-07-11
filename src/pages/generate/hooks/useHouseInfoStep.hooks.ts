import { useMemo, useState } from 'react';
import {
  HOUSE_INFO_VALIDATION,
  type CompleteHouseInfo,
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
  const { areAllFieldsFilled } = useMemo(() => {
    const areAllFieldsFilled = !!(
      formData.houseType &&
      formData.roomType &&
      formData.roomSize
    );

    return {
      areAllFieldsFilled,
    };
  }, [formData]);

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
  const handleSubmit = (onNext: (data: CompleteHouseInfo) => void) => {
    if (checkRestrictedValues()) {
      console.log('집 정보 입력 완료: ', formData);
      onNext(formData as CompleteHouseInfo);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    areAllFieldsFilled,
  };
};
