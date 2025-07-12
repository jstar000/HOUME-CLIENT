import { useImgGenerationFunnel } from '../hooks/useImageGenerationFunnel.hooks';
import HouseInfoStep from './steps/HouseInfoStep';
import HouseStructureStep from './steps/HouseStructureStep';
import InteriorTasteStep from './steps/InteriorTasteStep';
import MainActivityStep from './steps/MainActivityStep';
import {
  type CompletedHouseInfo,
  type CompletedHouseStructure,
  type CompletedInteriorTaste,
  type ImageGenerateSteps,
} from '../types/funnel';

export const ImageGenerationFunnel = () => {
  const funnel = useImgGenerationFunnel();

  return (
    <funnel.Render
      HouseInfo={funnel.Render.with({
        events: {
          selectHouseInfo: (data: CompletedHouseInfo, { history }) => {
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
            data: CompletedHouseStructure,
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
          selectInteriorTaste: (data: CompletedInteriorTaste, { history }) => {
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
