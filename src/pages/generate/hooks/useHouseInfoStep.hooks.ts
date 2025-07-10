import { useState } from 'react';
import type {
  CompleteHouseInfo,
  ImgGenerateSteps,
} from '../types/funnel.types';

interface FormErrors {
  houseType?: string;
  roomType?: string;
  roomSize?: string;
}

export const useHouseInfoStep = (context: ImgGenerateSteps['HouseInfo']) => {
  const [formData, setFormData] = useState({
    houseType: context.houseType,
    roomType: context.roomType,
    roomSize: context.roomSize,
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
    }
  };

  return {
    formData,
    setFormData,
    errors,
    handleSubmit,
    isValid: Object.keys(errors).length === 0,
  };
};
