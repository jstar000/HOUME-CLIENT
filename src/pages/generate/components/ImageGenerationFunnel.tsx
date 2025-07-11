import { useImgGenerationFunnel } from '../hooks/useImageGenerationFunnel.hooks';
import HouseInfoStep from './steps/HouseInfoStep';
import HouseStructureStep from './steps/HouseStructureStep';
import InteriorTasteStep from './steps/InteriorTasteStep';
import MainActivityStep from './steps/MainActivityStep';
import { type ImageGenerateSteps } from '../types/funnel';

export const ImageGenerationFunnel = () => {
  const funnel = useImgGenerationFunnel();

  return (
    <funnel.Render
      HouseInfo={funnel.Render.with({
        events: {
          selectHouseInfo: (
            data: Required<ImageGenerateSteps['HouseInfo']>,
            { history }
          ) => {
            history.push('HouseStructure', data);
          },
        },
        render({ dispatch, context }) {
          return (
            <HouseInfoStep
              context={context}
              onNext={(data) => dispatch('selectHouseInfo', data)}
            />
          );
        },
      })}
      HouseStructure={funnel.Render.with({
        events: {
          selectHouseStructure: (
            data: Required<ImageGenerateSteps['HouseStructure']>,
            { history }
          ) => {
            history.push('InteriorTaste', data);
          },
        },
        render({ dispatch, context }) {
          return (
            <HouseStructureStep
              context={context}
              onNext={(data) => dispatch('selectHouseStructure', data)}
            />
          );
        },
      })}
      InteriorTaste={funnel.Render.with({
        events: {
          selectInteriorTaste: (
            data: Required<ImageGenerateSteps['InteriorTaste']>,
            { history }
          ) => {
            history.push('MainActivity', data);
          },
        },
        render({ dispatch, context }) {
          return (
            <InteriorTasteStep
              context={context}
              onNext={(data) => dispatch('selectInteriorTaste', data)}
            />
          );
        },
      })}
      MainActivity={funnel.Render.with({
        events: {},
        render({ context }) {
          return <MainActivityStep context={context} />;
        },
      })}
    />
  );
};
