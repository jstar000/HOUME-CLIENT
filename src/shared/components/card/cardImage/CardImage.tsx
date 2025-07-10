import { useState } from 'react';
import * as styles from './CardImage.css.ts';

interface CardImageProps extends React.ComponentProps<'div'> {
  src: string;
  number?: number;
  disabled?: boolean;
  stroke: boolean;
}

const CardImage = ({ src, number = 0, disabled = false }: CardImageProps) => {
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
          {visualState === 'selected' ? number : ''}
        </button>
      )}
    </div>
  );
};

export default CardImage;
