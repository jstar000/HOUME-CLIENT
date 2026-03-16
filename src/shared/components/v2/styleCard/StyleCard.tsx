import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import fallbackImage from '@assets/v2/images/CardRoomTypeFallback.svg';
import IcnDoubleStar from '@assets/v2/svg/IcnDoubleStar.svg?react';

import * as styles from './StyleCard.css';

export type StyleCardSize = 's'; // 추후 사이즈 추가 시 확장

type StyleCardProps = Omit<
  ComponentProps<'button'>,
  'children' | 'onClick' | 'type'
> & {
  size?: StyleCardSize;
  imageSrc: string;
  title?: string;
  onClick?: () => void;
  imageLoading?: 'eager' | 'lazy';
};

const StyleCard = ({
  className,
  size = 's',
  imageSrc: initialImageSrc,
  title,
  onClick,
  imageLoading = 'lazy',
  ...rest
}: StyleCardProps) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);

  useEffect(() => {
    setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(styles.card({ size }), className)}
        onClick={onClick}
        {...rest}
      >
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className={styles.image}
          loading={imageLoading}
          decoding="async"
          draggable={false}
          onError={() => setImageSrc(fallbackImage)}
        />
        <div className={styles.gradient} aria-hidden />
        <IcnDoubleStar className={styles.starIcon({ size })} />
      </button>
      {title != null && title !== '' ? (
        <p className={styles.title({ size })}>{title}</p>
      ) : null}
    </div>
  );
};

export default StyleCard;
