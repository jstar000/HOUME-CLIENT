import type { ComponentProps } from 'react';
import { useEffect, useId, useState } from 'react';

import clsx from 'clsx';

import Icon from '@shared/components/v2/icon/Icon';

import fallbackImage from '@assets/v2/images/CardRoomTypeFallback.svg';

import * as styles from './StyleCard.css';

export type StyleCardSize = 's' | 'L';

type StyleCardProps = Omit<
  ComponentProps<'button'>,
  'children' | 'onClick' | 'type'
> & {
  size?: StyleCardSize;
  scaleOnPress?: boolean;
  imageSrc: string;
  title?: string;
  onClick?: () => void;
  imageLoading?: 'eager' | 'lazy';
};

const StyleCard = ({
  className,
  size = 's',
  scaleOnPress = true,
  imageSrc: initialImageSrc,
  title,
  onClick,
  imageLoading = 'lazy',
  ...rest
}: StyleCardProps) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const titleId = useId();
  const hasTitle = title != null && title !== '';
  const isLarge = size === 'L';
  const starIconSize = isLarge ? '20' : '16';

  useEffect(() => {
    setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(styles.card({ size, scaleOnPress }), className)}
        onClick={onClick}
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-label={hasTitle ? undefined : '스타일 카드 선택'}
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
        <div className={styles.gradient({ size })} aria-hidden />
        <div className={styles.starIcon({ size })} aria-hidden>
          <Icon name="DoubleStar" size={starIconSize} />
        </div>
        {isLarge && hasTitle ? (
          <p id={titleId} className={styles.titleOverlay}>
            {title}
          </p>
        ) : null}
      </button>
      {!isLarge && hasTitle ? (
        <p id={titleId} className={styles.title({ size: 's' })}>
          {title}
        </p>
      ) : null}
    </div>
  );
};

export default StyleCard;
