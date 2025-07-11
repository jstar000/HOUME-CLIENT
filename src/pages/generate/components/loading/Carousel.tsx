import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import 'swiper/css';
import { mockimages } from '../../constants/slideMockData';
import * as styles from '../loading/LoadingPage.css';

type CarouselProps = {
  currentIndex: number;
};

const ImageCarousel = ({ currentIndex }: CarouselProps) => {
  const [images] = useState(mockimages);
  const sliderRef = useRef<SwiperClass | null>(null);

  // currentIndex가 바뀔 때마다 슬라이드 이동
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slideTo(currentIndex);
    }
  }, [currentIndex]);

  return (
    <Swiper
      spaceBetween={30} // 슬라이드 간격
      slidesPerView={1} // 한 번에 보이는 슬라이드 개수
      allowTouchMove={false} // 버튼으로만 이동
      initialSlide={currentIndex} // 초기 슬라이드
      onSwiper={(swiper) => {
        sliderRef.current = swiper;
      }}
    >
      {images.map((item) => (
        <SwiperSlide key={item.id}>
          <img className={styles.imageArea} src={item.img} alt="carousel" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
