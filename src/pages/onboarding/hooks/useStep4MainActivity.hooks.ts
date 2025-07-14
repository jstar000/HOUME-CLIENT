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
    formData.otherFurnitures
  );

  return {
    formData,
    setFormData,
    errors,
    areAllFieldsFilled,
  };
};
