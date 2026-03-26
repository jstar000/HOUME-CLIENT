import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { getNextFunnelStep, useImageFlowStore } from '@store/useImageFlowStore';

import FeatureErrorFallback from '@components/errorFallback/FeatureErrorFallback';

import FunnelLayout from './components/layout/FunnelLayout';
import { useImageSetup } from './hooks/useImageGeneration';
import ActivityInfo from './steps/activityInfo/ActivityInfo';
import InteriorStyle from './steps/interiorStyle/InteriorStyle';
import { useFunnelStore } from './stores/useFunnelStore';
import FloorPlanSelectStep from './v2/steps/floorPlanSelect/FloorPlanSelectStep';

import type {
  CompletedFloorPlanSelect,
  CompletedInteriorStyle,
} from './types/funnel/steps';

type StepType = 'FloorPlanSelect' | 'InteriorStyle' | 'ActivityInfo';

interface StepWrapperProps {
  step: StepType;
  onMount: (step: StepType) => void;
  children: React.ReactNode;
}

const StepWrapper = ({ step, onMount, children }: StepWrapperProps) => {
  useEffect(() => {
    onMount(step);
  }, [step, onMount]);

  return <>{children}</>;
};

const ImageSetupPage = () => {
  const funnel = useImageSetup();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepType>('FloorPlanSelect');

  // 퍼널 전체가 unmount될 때 (퍼널 벗어날 때) 데이터 초기화
  useEffect(() => {
    return () => {
      useFunnelStore.getState().reset();
    };
  }, []);

  return (
    <FunnelLayout currentStep={currentStep}>
      <ErrorBoundary
        FallbackComponent={FeatureErrorFallback}
        onReset={() => {
          useFunnelStore.getState().reset();
        }}
      >
        <funnel.Render
          FloorPlanSelect={funnel.Render.with({
            events: {
              selectedFloorPlan: (
                data: CompletedFloorPlanSelect,
                { history }
              ) => {
                const entryRoute = useImageFlowStore.getState().entryRoute;
                const nextStep = getNextFunnelStep(
                  entryRoute ?? 'GENERATE_BUTTON'
                );

                if (nextStep === 'INTERIOR_STYLE') {
                  // 풀퍼널 (경로 1, 3): 다음 스텝으로 이동
                  history.push('InteriorStyle', data);
                } else {
                  // 숏퍼널 (경로 2, 4, 5): 퍼널 탈출 → 이미지 생성
                  // TODO: 생성 데이터 조립 후 sessionStorage 저장
                  console.log('[ImageSetupPage] 숏퍼널 → Loading', data);
                  navigate(ROUTES.GENERATE);
                }
              },
            },
            render({ dispatch, context }) {
              return (
                <StepWrapper step="FloorPlanSelect" onMount={setCurrentStep}>
                  <FloorPlanSelectStep
                    context={context}
                    onNext={(data) => dispatch('selectedFloorPlan', data)}
                  />
                </StepWrapper>
              );
            },
          })}
          InteriorStyle={funnel.Render.with({
            events: {
              selectInteriorStyle: (
                data: CompletedInteriorStyle,
                { history }
              ) => {
                history.push('ActivityInfo', data);
              },
            },
            render({ dispatch, context }) {
              return (
                <StepWrapper step="InteriorStyle" onMount={setCurrentStep}>
                  <InteriorStyle
                    context={context}
                    onNext={(data) => dispatch('selectInteriorStyle', data)}
                  />
                </StepWrapper>
              );
            },
          })}
          ActivityInfo={funnel.Render.with({
            events: {},
            render({ context }) {
              return (
                <StepWrapper step="ActivityInfo" onMount={setCurrentStep}>
                  <ActivityInfo context={context} />
                </StepWrapper>
              );
            },
          })}
        />
      </ErrorBoundary>
    </FunnelLayout>
  );
};

export default ImageSetupPage;
