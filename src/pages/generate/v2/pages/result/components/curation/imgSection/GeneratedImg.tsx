import { useState, useEffect } from 'react';

import { overlay } from 'overlay-kit';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { GenerateImageData } from '@pages/generate/types/generate';

import SlideNext from '@assets/icons/nextAbled.svg?react';
import SlideNextDisabled from '@assets/icons/nextDisabled.svg?react';
import SlidePrev from '@assets/icons/prevAbled.svg?react';
import SlidePrevDisabled from '@assets/icons/prevDisabled.svg?react';
import generateResultLockedPreview from '@assets/images/generateResultLockedPreview.png';

import CommunityComingSoonModal from '@components/overlay/modal/CommunityComingSoonModal';

import * as styles from './GeneratedImg.css';

import type { Swiper as SwiperType } from 'swiper';

export interface GeneratedImgCurationProps {
  /** 다중 생성 이미지 (스와이퍼 슬라이드) */
  images: GenerateImageData[];
  onCurrentImgIdChange?: (currentImgId: number) => void;
  /** 슬라이드 변경 시 인덱스 (잠금 슬라이드 = images.length) */
  onSlideChange?: (slideIndex: number) => void;
  isSlideCountLoading?: boolean;
}

/**
 * v2 큐레이션 결과 상단 — 생성 이미지 스와이퍼 + 맨 뒤 잠금(이미지 더보기) 슬라이드
 */
const GeneratedImg = ({
  images,
  onCurrentImgIdChange,
  onSlideChange,
  isSlideCountLoading = false,
}: GeneratedImgCurationProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentImgId, setCurrentImgId] = useState<number | null>(null);

  const lastImage = images[images.length - 1];
  const hasLockedSlide = Boolean(lastImage);
  const totalSlideCount = hasLockedSlide ? images.length + 1 : images.length;

  useEffect(() => {
    if (currentImgId !== null) {
      onCurrentImgIdChange?.(currentImgId);
    }
  }, [currentImgId, onCurrentImgIdChange]);

  useEffect(() => {
    if (currentSlideIndex < images.length) {
      const newImgId = images[currentSlideIndex]?.imageId;
      setCurrentImgId(newImgId !== undefined ? newImgId : null);
      return;
    }
    const fallbackId = lastImage?.imageId;
    setCurrentImgId(fallbackId !== undefined ? fallbackId : null);
  }, [currentSlideIndex, images, lastImage?.imageId]);

  const isPrevDisabled = !swiper || currentSlideIndex === 0;
  const isNextDisabled =
    !swiper || currentSlideIndex === Math.max(0, totalSlideCount - 1);

  const handleOpenModal = () => {
    overlay.open(({ unmount }) => (
      <CommunityComingSoonModal onClose={unmount} />
    ));
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sliderArea}>
        <Swiper
          slidesPerView={1}
          onSlideChange={(swiperInstance) => {
            const index = swiperInstance.activeIndex;
            setCurrentSlideIndex(index);
            onSlideChange?.(index);
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
            <span className={styles.slideNavIconFrame}>
              {isPrevDisabled ? <SlidePrevDisabled /> : <SlidePrev />}
            </span>
          </button>
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image.imageId}-${index}`}
              className={styles.swiperSlide}
            >
              <img
                src={image.imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className={styles.imgArea({ mirrored: image.isMirror })}
              />
            </SwiperSlide>
          ))}
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
            <span className={styles.slideNavIconFrame}>
              {isNextDisabled ? <SlideNextDisabled /> : <SlideNext />}
            </span>
          </button>
        </Swiper>
      </div>
    </div>
  );
};

export default GeneratedImg;
