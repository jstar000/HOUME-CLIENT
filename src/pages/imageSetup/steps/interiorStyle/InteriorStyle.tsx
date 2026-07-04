// Step 3
import { useEffect } from 'react';

import { useMoodBoardQuery } from '@pages/imageSetup/apis/queries/useMoodBoardQuery';
import { useInteriorStyle } from '@pages/imageSetup/hooks/useInteriorStyle';

import { GA_EVENTS } from '@shared/analytics/events';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';
import ActionButton from '@components/v2/button/actionButton/ActionButton';
import TextHeading from '@components/v2/textHeading/TextHeading';

import { buildMoodboardIdsParam } from '@/shared/analytics/utils/imageFlow/imageFlowParams';

import * as styles from './InteriorStyle.css';
import MoodBoard from './MoodBoard';

import type {
  CompletedInteriorStyle,
  ImageSetupSteps,
} from '../../types/funnel/steps';

interface InteriorStyleProps {
  context: ImageSetupSteps['InteriorStyle'];
  onNext: (data: CompletedInteriorStyle) => void;
}

const InteriorStyle = ({ context, onNext }: InteriorStyleProps) => {
  const { selectedImages, handleImageSelect, handleNext, isDataComplete } =
    useInteriorStyle(context, onNext);

  const {
    data: moodBoardData,
    isPending,
    isError,
    refetch,
  } = useMoodBoardQuery();
  const images = moodBoardData?.moodBoardResponseList || [];

  useEffect(() => {
    trackEvent(GA_EVENTS.selectMoodboard.PAGE_VIEW, {
      screen_name: SCREEN_NAME.SELECT_MOODBOARD,
      image_entry_route: getEntryRoute(),
    });
  }, []);

  // CTA 버튼 클릭 핸들러 (현재 native disabled로 비활성 시 클릭 자체가 차단됨)
  // TODO: ActionButton에 visuallyDisabled prop이 추가되면(별도 PR)
  // selectMoodboard_btnCTAInactive_click 로깅을 다시 복원할 것
  const handleCtaButtonClick = () => {
    trackEvent(GA_EVENTS.selectMoodboard.BTN_CTA_CLICK, {
      screen_name: SCREEN_NAME.SELECT_MOODBOARD,
      image_entry_route: getEntryRoute(),
      selected_moodBoard_ids: buildMoodboardIdsParam(selectedImages),
      count_moodBoard: selectedImages.length,
    });
    handleNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingWrapper}>
        <TextHeading
          title="인테리어 취향을 알려주세요"
          caption={`인테리어 취향에 맞는 이미지를\n최대 5개까지 선택해주세요.`}
        />
      </div>

      {isError ? (
        <InlineError
          onRetry={refetch}
          message="무드보드를 불러올 수 없습니다"
        />
      ) : isPending ? (
        <Loading />
      ) : (
        <>
          <MoodBoard
            images={images}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
          />
          <div className={styles.buttonWrapper}>
            <ActionButton
              variant="solid"
              color="primary"
              size="2XL"
              disabled={!isDataComplete}
              onClick={handleCtaButtonClick}
            >
              다음
            </ActionButton>
          </div>
        </>
      )}
    </div>
  );
};

export default InteriorStyle;
