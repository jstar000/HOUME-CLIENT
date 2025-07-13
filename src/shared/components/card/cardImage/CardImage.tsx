import { useState } from 'react';
import * as styles from './CardImage.css.ts';

interface CardImageProps extends React.ComponentProps<'div'> {
  src: string;
  selectOrder?: number;
  disabled?: boolean;
}

const CardImage = ({
  src,
  selectOrder = 0,
  disabled = false,
}: CardImageProps) => {
  const [state, setState] = useState<'default' | 'pressed' | 'selected'>(
    'default'
  );

  const handleMouseDown = () => {
    if (disabled) return;

    if (state === 'default') {
      setState('pressed');
    }
  };

  const handleMouseUp = () => {
    if (disabled) return;

    if (state === 'pressed') {
      setState('selected');
    } else if (state === 'selected') {
      setState('default');
    }
  };

  const visualState = disabled ? 'disabled' : state;

  return (
    <div
      className={styles.cardcontainer({ state: visualState })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img
        src={src}
        className={disabled ? styles.disabledcardimg : styles.cardimg}
        alt="카드 이미지"
      />
      {visualState !== 'disabled' && (
        <button
          type="button"
          className={styles.checkbox({ state: visualState })}
        >
          {visualState === 'selected' ? selectOrder : ''}
        </button>
      )}
    </div>
  );
};

export default CardImage;
