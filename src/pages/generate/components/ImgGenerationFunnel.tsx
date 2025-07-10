import { useImgGenerationFunnel } from '../hooks/useImageGenerationFunnel.hooks';
import HouseInfoStep from './steps/HouseInfoStep';
import HouseStructureStep from './steps/HouseStructureStep';
import InteriorTasteStep from './steps/InteriorTasteStep';
import MainActivityStep from './steps/MainActivityStep';
import type { ImgGenerateSteps } from '../types/funnel.types';

export const ImageGenerationFunnel = () => {
  const funnel = useImgGenerationFunnel();

  return (
    <funnel.Render
      // 퍼널의 모든 단계를 렌더링하는 메인 컴포넌트
      HouseInfo={funnel.Render.with({
        // 각 단계의 이벤트와 렌더링 로직을 정의
        events: {
          // 이벤트 객체, 해당 Step에서 특정 액션(버튼 클릭 등)이 발생할 때 실행되는 이벤트 등록
          selectHouseInfo: (
            data: Required<ImgGenerateSteps['HouseInfo']>,
            { history }
          ) => {
            // selectHouseInfo는 이벤트 이름(자유롭게 설정 가능)
            // 아래 dispatch에서
            history.push('HouseStructure', data);
          },
        },
        render({ dispatch, context }) {
          // dispatch: events 객체에 등록된 이벤트를 발생시키는 함수
          /* 
          // context: 해당 Step에서의 상태 데이터
          // ex: HouseInfo 단계에서 context의 타입
            context: {
            houseType?: HouseType;
            roomType?: RoomType;
            roomSize?: RoomSize;
            }
          */

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
            data: Required<ImgGenerateSteps['HouseStructure']>,
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
            data: Required<ImgGenerateSteps['InteriorTaste']>,
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
