/**
 * 무드보드 컴포넌트
 *
 * 사용자가 이미지를 선택할 수 있는 무드보드 컴포넌트입니다.
 * 최대 5개까지 이미지를 선택할 수 있으며, 선택 순서대로 1~5번이 표시됩니다.
 * 5개가 선택되면 나머지 이미지들은 비활성화됩니다.
 *
 * @returns JSX.Element - 무드보드 컴포넌트
 */
import { useState } from 'react';
import * as styles from './MoodBoard.css';
import { useMoodBoardImage } from '@/pages/onboarding/hooks/useMoodBoardImage.hooks';
import CardImage from '@/shared/components/card/cardImage/CardImage';

const MoodBoard = () => {
  /**
   * 선택된 이미지들의 ID를 순서대로 저장하는 상태
   * @type {number[]}
   */
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  /**
   * 이미지 선택/해제를 처리하는 함수
   *
   * @param {number} imageId - 선택/해제할 이미지의 ID
   */
  const handleImageSelect = (imageId: number) => {
    setSelectedImages((prev) => {
      const isSelected = prev.includes(imageId);

      if (isSelected) {
        // 이미 선택된 경우: 선택 해제
        return prev.filter((id) => id !== imageId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, imageId];
    });
  };

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
  const { data, isPending, isError } = useMoodBoardImage(0, 18);

  // 로딩/에러 처리
  if (isPending) return <div>이미지 불러오는 중...</div>;
  if (isError) return <div>이미지 불러오기 실패</div>;

  // 받아온 이미지 데이터
  const images = data?.data?.moodBoardResponseList || [];

  return (
    <div className={styles.container}>
      <div className={styles.gridbox}>
        {images.map(
          (image: { id: number; imageUrl: string; fileExtension: string }) => {
            const isSelected = selectedImages.includes(image.id);
            const isDisabled = selectedImages.length >= 5 && !isSelected;

            return (
              <CardImage
                key={image.id}
                src={image.imageUrl}
                selectOrder={getSelectOrder(image.id)}
                onClick={() => handleImageSelect(image.id)}
                disabled={isDisabled}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default MoodBoard;
