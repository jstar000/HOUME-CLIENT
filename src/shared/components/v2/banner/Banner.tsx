import { useState } from 'react';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import imgBanner01 from '@shared/assets/v2/images/ImgBanner_01.png';
import imgBanner02 from '@shared/assets/v2/images/ImgBanner_02.png';
import imgBanner03 from '@shared/assets/v2/images/ImgBanner_03.png';
import imgBanner04 from '@shared/assets/v2/images/ImgBanner_04.png';
import IcnDoubleStar from '@shared/assets/v2/svg/IcnDoubleStar.svg?react';

import * as styles from './Banner.css';

import type { Swiper as SwiperType } from 'swiper';

const BANNER_SLIDES = [
  {
    id: 1,
    title: '잦은 재택근무에 딱 맞는',
    imageUrl: imgBanner01,
  },
  {
    id: 2,
    title: '창가에서 브런치 즐기는',
    imageUrl: imgBanner02,
  },
  {
    id: 3,
    title: '친구 초대하기 좋은',
    imageUrl: imgBanner03,
  },
  {
    id: 4,
    title: 'OTT 감상하기 좋은',
    imageUrl: imgBanner04,
  },
] as const;

const TOTAL = BANNER_SLIDES.length;
const AUTO_PLAY_DELAY_MS = 4000;

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.swiperWrapper}>
        <Swiper
          className={styles.bannerSwiper}
          modules={[Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: AUTO_PLAY_DELAY_MS,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper: SwiperType) => {
            setActiveIndex(swiper.realIndex);
          }}
          onSwiper={(swiper: SwiperType) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {BANNER_SLIDES.map((slide) => (
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

      <div className={styles.contentOverlay} aria-hidden>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {BANNER_SLIDES[activeIndex].title} <br /> 우리 집 스타일링하기
          </h2>
          <p className={styles.cta}>
            <IcnDoubleStar aria-hidden /> 지금 바로 적용해보기
          </p>
        </div>
      </div>

      <div className={styles.indicatorOverlay} aria-hidden>
        <div className={styles.indicator}>
          <span className={styles.indicatorCurrent}>{activeIndex + 1}</span>
          <span className={styles.indicatorSeparator}> | </span>
          <span className={styles.indicatorTotal}>{TOTAL}</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
