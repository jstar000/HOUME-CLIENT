import { useState, useEffect } from 'react';

import { overlay } from 'overlay-kit';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useABTest } from '@/pages/generate/hooks/useABTest';
import {
  logResultImgClickBtnMoreImg,
  logResultImgClickMoreModalBack,
  logResultImgSwipeSlideLeft,
  logResultImgSwipeSlideRight,
} from '@/pages/generate/utils/analytics';
import CommunityComingSoonModal from '@/shared/components/overlay/modal/CommunityComingSoonModal';

import generateResultLockedPreview from '@assets/images/generateResultLockedPreview.png';
import SlideNext from '@shared/assets/icons/nextAbled.svg?react';
import SlideNextDisabled from '@shared/assets/icons/nextDisabled.svg?react';
import SlidePrev from '@shared/assets/icons/prevAbled.svg?react';
import SlidePrevDisabled from '@shared/assets/icons/prevDisabled.svg?react';

import DetectionHotspots from './DetectionHotspots';
import * as styles from './GeneratedImg.css.ts';

import type { DetectionCacheEntry } from '@pages/generate/stores/useDetectionCacheStore';
import type {
  GenerateImageData,
  GenerateImageAResponse,
  GenerateImageBResponse,
} from '@pages/generate/types/generate';
import type { Swiper as SwiperType } from 'swiper';

// 통일된 타입 정의
type UnifiedGenerateImageResult = {
  imageInfoResponses: GenerateImageData[];
};

interface GeneratedImgAProps {
  result:
    | UnifiedGenerateImageResult
    | GenerateImageAResponse['data']
    | GenerateImageBResponse['data'];
  onSlideChange?: (currentIndex: number, totalCount: number) => void;
  onCurrentImgIdChange?: (currentImgId: number) => void;
  shouldInferHotspots?: boolean;
  detectionCache?: Record<number, DetectionCacheEntry> | null;
  isSlideCountLoading?: boolean;
}

/**
 * 다중 이미지 결과 뷰(variant A)
 * - 스와이프 기반 슬라이더와 바텀시트 연동
 * - 마지막 슬라이드에서 추가 생성 CTA 노출
 */
const GeneratedImgA = ({
  result: propResult,
  onSlideChange,
  onCurrentImgIdChange,
  shouldInferHotspots = true,
  detectionCache,
  isSlideCountLoading = false,
}: GeneratedImgAProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentImgId, setCurrentImgId] = useState(0);
  const { variant } = useABTest();

  // currentImgId가 변경될 때마다 부모에게 전달
  useEffect(() => {
    onCurrentImgIdChange?.(currentImgId);
  }, [currentImgId, onCurrentImgIdChange]);

  // 부모로부터 받은 데이터 사용 (필수 prop)
  const result = propResult;

  useEffect(() => {
    if (
      result &&
      'imageInfoResponses' in result &&
      Array.isArray(result.imageInfoResponses)
    ) {
      const newImgId = result.imageInfoResponses[currentSlideIndex]?.imageId;
      setCurrentImgId(newImgId ?? 0);
    }
  }, [currentSlideIndex, result]);

  // 데이터 타입에 따라 처리 - 이제 통일된 형태로 처리
  let images: GenerateImageData[] = [];

  if ('imageInfoResponses' in result) {
    // 통일된 형태 또는 A안: 다중 이미지 데이터
    images = result.imageInfoResponses;
  } else {
    // B안: 단일 이미지 데이터를 배열로 변환
    images = [result];
  }

  const lastImage = images[images.length - 1];
  const totalSlideCount = lastImage ? images.length + 1 : images.length;
  const isPrevDisabled = !swiper || currentSlideIndex === 0;
  const isNextDisabled = !swiper || currentSlideIndex === totalSlideCount - 1;

  /**
   * 더보기 모달 오픈
   */
  const handleOpenModal = () => {
    logResultImgClickBtnMoreImg(variant);
    overlay.open(({ unmount }) => {
      const closeModal = () => {
        logResultImgClickMoreModalBack(variant);
        unmount();
      };

      return <CommunityComingSoonModal onClose={closeModal} />;
    });
  };

  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => {
          const prevIndex = currentSlideIndex;
          const newIndex = swiper.activeIndex;
          setCurrentSlideIndex(newIndex);
          onSlideChange?.(newIndex, totalSlideCount);

          // 슬라이드 스와이프 이벤트 전송
          if (newIndex > prevIndex) {
            logResultImgSwipeSlideRight(variant);
          } else if (newIndex < prevIndex) {
            logResultImgSwipeSlideLeft(variant);
          }
        }}
        onSwiper={setSwiper}
      >
        <div className={styles.slideNum} aria-live="polite">
          {isSlideCountLoading ? (
            <div
              className={styles.slideNumSkeleton}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            <>
              <span>{currentSlideIndex + 1}</span>
              <span>/</span>
              <span>{totalSlideCount}</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          className={styles.slidePrevBtn}
          disabled={isPrevDisabled}
        >
          {isPrevDisabled ? <SlidePrevDisabled /> : <SlidePrev />}
        </button>
        {images.map((image, index) => {
          const cachedDetection =
            image.imageId && detectionCache
              ? (detectionCache[image.imageId] ?? null)
              : null;
          return (
            <SwiperSlide
              key={`${image.imageId}-${index}`}
              className={styles.swiperSlide}
            >
              <DetectionHotspots
                imageId={image.imageId}
                imageUrl={image.imageUrl}
                mirrored={image.isMirror}
                // 결과 페이지 플래그로 추론 on/off 제어
                shouldInferHotspots={shouldInferHotspots}
                cachedDetection={cachedDetection}
              />
            </SwiperSlide>
          );
        })}
        {lastImage && (
          <SwiperSlide key="locked-preview" className={styles.swiperSlide}>
            <img
              src={generateResultLockedPreview}
              alt=""
              className={styles.lockedPreviewImg}
            />
            <div className={styles.lockWrapper}>
              <div className={styles.lockTextBox}>
                <p>나와 취향이 비슷한</p>
                <p>유저들이 만든 이미지도 궁금하신가요?</p>
              </div>
              <button
                type="button"
                className={styles.moreBtn}
                onClick={handleOpenModal}
              >
                이미지 더보기
              </button>
            </div>
          </SwiperSlide>
        )}
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          className={styles.slideNextBtn}
          disabled={isNextDisabled}
        >
          {isNextDisabled ? <SlideNextDisabled /> : <SlideNext />}
        </button>
      </Swiper>
    </div>
  );
};

export default GeneratedImgA;
