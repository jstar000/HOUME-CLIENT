import { useFunnel } from '@use-funnel/react-router';
import type { ImageGenerateSteps } from '../types/funnel';

export const useImageGenerationFunnel = () => {
  return useFunnel<ImageGenerateSteps>({
    id: 'image-generation-funnel',
    initial: {
      step: 'HouseInfo', // Step의 첫 단계
      context: {}, // 첫 Step에서는 context를 빈 객체로 선언
    },
  });
};
