import { useState } from 'react';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import IcnDoubleStar from '@assets/v2/svg/IcnDoubleStar.svg?react';

import * as styles from './Banner.css';

import type { Swiper as SwiperType } from 'swiper';

export type BannerSlide = {
  id: number;
  title: string;
  imageUrl: string;
};

const AUTO_PLAY_DELAY_MS = 4000;

type BannerProps = {
  slides: BannerSlide[];
};

const Banner = ({ slides }: BannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;
  const currentSlide = slides[activeIndex];

  return (
    <div className={styles.root}>
      <div className={styles.swiperWrapper}>
        <Swiper
          className={styles.bannerSwiper}
          modules={[Autoplay]}
          slidesPerView={1}
          loop={slides.length > 1}
          autoplay={
            slides.length > 1
              ? {
                  delay: AUTO_PLAY_DELAY_MS,
                  disableOnInteraction: false,
                }
              : false
          }
          onSlideChange={(swiper: SwiperType) => {
            setActiveIndex(swiper.realIndex);
          }}
          onSwiper={(swiper: SwiperType) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className={styles.swiperSlide}>
              {slide.imageUrl ? (
                <div className={styles.wrapper}>
                  <img
                    src={slide.imageUrl}
                    alt=""
                    className={styles.image}
                    draggable={false}
                  />
                  <div className={styles.gradientOverlay} />
                </div>
              ) : (
                <div className={styles.slidePlaceholder} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {currentSlide && (
        <div className={styles.contentOverlay} aria-hidden>
          <div className={styles.content}>
            <h2 className={styles.title}>
              {currentSlide.title} <br /> 우리 집 스타일링하기
            </h2>
            <p className={styles.cta}>
              <IcnDoubleStar aria-hidden /> 지금 바로 적용해보기
            </p>
          </div>
        </div>
      )}

      {total > 0 && (
        <div className={styles.indicatorOverlay} aria-hidden>
          <div className={styles.indicator}>
            <span className={styles.indicatorCurrent}>{activeIndex + 1}</span>
            <span className={styles.indicatorSeparator}> | </span>
            <span className={styles.indicatorTotal}>{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
