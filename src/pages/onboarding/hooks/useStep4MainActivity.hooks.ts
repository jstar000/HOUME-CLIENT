import { useState } from 'react';
import type { ImageGenerateSteps } from '../types/funnel';

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
    otherFurnitures: context.otherFurnitures,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const areAllFieldsFilled = !!(
    formData.primaryUsage &&
    formData.bedType &&
    Array.isArray(formData.otherFurnitures) && // 배열인지 확인
    formData.otherFurnitures.length > 0 // 배열에 최소 1개 이상의 요소가 있는지 확인
  );

  return {
    formData,
    setFormData,
    errors,
    areAllFieldsFilled,
  };
};
