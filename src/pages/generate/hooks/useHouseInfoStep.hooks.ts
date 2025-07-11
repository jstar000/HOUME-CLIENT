import { useEffect, useState } from 'react';
import type {
  CompleteHouseInfo,
  ImageGenerateSteps,
} from '../types/funnel.types';

interface FormErrors {
  houseType?: string;
  roomType?: string;
  roomSize?: string;
}

export const useHouseInfoStep = (context: ImageGenerateSteps['HouseInfo']) => {
  // 입력 필드 3개 값 저장
  const [formData, setFormData] = useState({
    houseType: context.houseType,
    roomType: context.roomType,
    roomSize: context.roomSize,
  });
  const [isValid, setIsValid] = useState(false); // 입력값 3개 모두 있는지 확인

  // 입력 필드 3개 모두 선택하지 않을 시 다음단계 버튼 비활성화
  useEffect(() => {
    const valid =
      !!formData.houseType && !!formData.roomType && !!formData.roomSize;
    setIsValid(valid);
  }, [formData]);

  // 입력되지 않은 필드 저장
  const [errors, setErrors] = useState<FormErrors>({});

  // 입력 필드 3개 validation 진행
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.houseType) newErrors.houseType = '주거 형태를 선택해주세요';
    if (!formData.roomType) newErrors.roomType = '방 구조를 선택해주세요';
    if (!formData.roomSize) newErrors.roomSize = '평형을 선택해주세요';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (onNext: (data: CompleteHouseInfo) => void) => {
    if (validateForm()) {
      console.log('집 정보 입력 완료: ', formData);
      onNext(formData as CompleteHouseInfo);
    } else {
      console.log('input not valid');
      console.log(formData);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    isValid,
    setIsValid,
  };
};
