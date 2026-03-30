import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { getNextFunnelStep, useImageFlowStore } from '@store/useImageFlowStore';
import { useUserStore } from '@store/useUserStore';

import FeatureErrorFallback from '@components/errorFallback/FeatureErrorFallback';

import { setLoginRedirect } from '@utils/loginRedirect';

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

  // entryRoute가 존재하지 않으면(ex: URL로 직접 접근) 홈으로 리다이렉트하도록 예외처리
  // entryRoute는 sessionStorage persist로 저장되므로 브라우저 새로고침, OAuth 복귀 시에는 유지됨 -> 예외처리 필요 X
  // sessionStorage 수동 삭제 <- 이까지는 일반적인 사용자 플로우 X
  // => URL로 직접 접근하는 경우에 대한 예외처리만 적용하면 될 듯함
  const entryRoute = useImageFlowStore.getState().entryRoute;
  if (!entryRoute) {
    navigate(ROUTES.HOME);
    return null;
  }

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
                // ImageSetupPage 진입 시점에 entryRoute null 체크 진행하므로 이벤트 핸들러 시점에서 entryRoute는 반드시 존재
                const nextStep = getNextFunnelStep(entryRoute!);

                if (nextStep === 'INTERIOR_STYLE') {
                  // 풀퍼널 (경로 1, 3): 로그인 체크 후 다음 스텝으로 이동
                  const isLoggedIn = !!useUserStore.getState().accessToken;

                  if (!isLoggedIn) {
                    // 미로그인: 도면 선택값은 useFunnelStore persist로 유지됨
                    setLoginRedirect(ROUTES.IMAGE_SETUP);
                    navigate(ROUTES.LOGIN);
                    return;
                  }

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
