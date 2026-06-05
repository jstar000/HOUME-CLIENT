import type { ComponentProps } from 'react';
import { useLayoutEffect, useState } from 'react';

import { getImageSrcSet } from '@utils/imageVariant';

type OptimizedImageProps = Omit<ComponentProps<'img'>, 'src' | 'srcSet'> & {
  /** 이미지 원본 URL (어드민 이미지면 variant로, 그 외엔 원본 그대로 로드) */
  src: string;
  /** 렌더 슬롯 크기(예: '200px'). 지정하면 variant srcSet을 사용하고, 없으면 원본만 로드한다. */
  sizes?: string;
  /** variant·원본이 모두 실패했을 때 마지막으로 보여줄 정적 이미지 */
  fallbackSrc?: string;
};

/**
 * 모든 이미지를 다루는 공용 이미지 컴포넌트.
 *
 * - 어드민 이미지(우리 S3의 .png/.jpg): 400/800/1280 WebP variant를 srcSet으로 로드한다.
 * - 그 외(외부 CDN의 ?w= 쿼리 URL, 이미 webp, svg 등): variant 없이 원본을 그대로 로드한다.
 *   (getImageSrcSet이 undefined를 반환 -> srcSet 없이 src만 사용)
 *
 * 폴백 체인: variant(srcSet) -> 원본 -> 정적 fallbackSrc.
 * 서버 variant가 아직 없으면(배포 전) variant가 404 -> 원본으로 떨어져 화면이 깨지지 않는다.
 * loading은 기본 lazy이며, 화면 최상단(LCP) 이미지는 호출부에서 loading="eager"로 덮어쓴다.
 */
const OptimizedImage = ({
  src,
  sizes,
  fallbackSrc,
  ...rest
}: OptimizedImageProps) => {
  const [srcSet, setSrcSet] = useState(() =>
    sizes ? getImageSrcSet(src) : undefined
  );
  const [currentSrc, setCurrentSrc] = useState(src);

  // 부모가 새 src를 내려주면 페인트 전에 동기화 (옛 이미지가 한 프레임 노출되는 것 방지)
  useLayoutEffect(() => {
    setCurrentSrc(src);
    setSrcSet(sizes ? getImageSrcSet(src) : undefined);
  }, [src, sizes]);

  const handleError = () => {
    if (srcSet) {
      setSrcSet(undefined); // variant 실패 -> 원본으로 폴백
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc); // 원본 실패 -> 정적 이미지로 폴백
    }
  };

  return (
    <img
      loading="lazy"
      {...rest}
      src={currentSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      onError={handleError}
    />
  );
};

export default OptimizedImage;
