/**
 * 무드보드 컴포넌트
 *
 * 사용자가 이미지를 선택할 수 있는 무드보드 컴포넌트입니다.
 * 최대 5개까지 이미지를 선택할 수 있으며, 선택 순서대로 1~5번이 표시됩니다.
 * 5개가 선택되면 나머지 이미지들은 비활성화됩니다.
 *
 * @param {number[]} selectedImages - 선택된 이미지들의 ID 배열
 * @param {function} onImageSelect - 이미지 선택/해제 처리 함수
 * @returns JSX.Element - 무드보드 컴포넌트
 */

import { useMoodBoardQuery } from '@/pages/imageSetup/apis/interiorStyle';
import {
  MOOD_BOARD_CONSTANTS,
  type MoodBoardImageItem,
} from '@/pages/imageSetup/types/apis/interiorStyle';
import CardImage from '@/shared/components/card/cardImage/CardImage';
import SkeletonCardImage from '@/shared/components/card/cardImage/SkeletonCardImage';
import InlineError from '@/shared/components/inlineError/InlineError';

import * as styles from './MoodBoard.css';

interface MoodBoardProps {
  selectedImages: number[];
  onImageSelect: (imageId: number) => void;
}

const MoodBoard = ({ selectedImages, onImageSelect }: MoodBoardProps) => {
  /**
   * 이미지의 선택 순서를 반환하는 함수
   *
   * @param {number} imageId - 확인할 이미지의 ID
   * @returns {number} 선택 순서 (1~5), 선택되지 않았으면 0
   */
  const getSelectOrder = (imageId: number) => {
    const index = selectedImages.indexOf(imageId);
    return index !== -1 ? index + 1 : 0;
  };

  // 이미지 API 호출
  const {
    data: moodBoardData,
    isLoading,
    isError,
    refetch,
  } = useMoodBoardQuery();
  const images = moodBoardData?.moodBoardResponseList || [];

  // 로딩 상태 처리
  if (isLoading || images.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.gridbox}>
          {Array.from(
            { length: MOOD_BOARD_CONSTANTS.DEFAULT_LIMIT },
            (_, idx) => (
              <SkeletonCardImage key={idx} />
            )
          )}
        </div>
      </div>
    );
  }

  // API 에러 시 인라인 에러 표시
  if (isError) {
    return (
      <InlineError onRetry={refetch} message="무드보드를 불러올 수 없습니다" />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.gridbox}>
          {images.map((image: MoodBoardImageItem) => {
            const isSelected = selectedImages.includes(image.id);
            const isDisabled =
              selectedImages.length >= MOOD_BOARD_CONSTANTS.MAX_SELECTIONS &&
              !isSelected;

            return (
              <CardImage
                key={image.id}
                src={image.imageUrl}
                alt={'선택 가능한 무드보드 이미지'}
                selectOrder={getSelectOrder(image.id)}
                onClick={() => onImageSelect(image.id)}
                disabled={isDisabled}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodBoard;
