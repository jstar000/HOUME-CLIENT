import { useFunnel } from '@use-funnel/react-router';
import type { ImgGenerateSteps } from '../types/funnel.types';

export const useImgGenerationFunnel = () => {
  return useFunnel<ImgGenerateSteps>({
    id: 'image-generation-funnel',
    initial: {
      step: 'HouseInfo', // Step의 첫 단계
      context: {}, // 첫 Step에서는 context를 빈 객체로 선언
    },
  });
};
