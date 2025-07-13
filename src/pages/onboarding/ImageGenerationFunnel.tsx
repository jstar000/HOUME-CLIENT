import { useImgGenerationFunnel } from './hooks/useImageGenerationFunnel.hooks';
import Step1HouseInfo from './components/steps/step1/Step1HouseInfo';
import Step2HouseStructure from './components/steps/step2/Step2HouseStructure';
import Step4InteriorTaste from './components/steps/step3/Step3InteriorTaste';
import Step4MainActivity from './components/steps/step4/Step4MainActivity';
import {
  type CompletedHouseInfo,
  type CompletedHouseStructure,
  type CompletedInteriorTaste,
} from './types/funnel';

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
            <Step1HouseInfo
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
            <Step2HouseStructure
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
            <Step4InteriorTaste
              context={context}
              onNext={(data) => dispatch('selectInteriorTaste', data)}
            />
          );
        },
      })}
      MainActivity={funnel.Render.with({
        events: {},
        render({ context }) {
          return <Step4MainActivity context={context} />;
        },
      })}
    />
  );
};
