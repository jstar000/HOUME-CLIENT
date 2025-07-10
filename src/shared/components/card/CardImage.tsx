import { useState } from 'react';
import example from '@assets/images/example.png';
import * as styles from './CardImage.css.ts';

interface CardImageProps extends React.ComponentProps<'div'> {
  number?: number;
  disabled?: boolean;
}

const CardImage = ({ number, disabled = false }: CardImageProps) => {
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
        src={example}
        className={disabled ? styles.disabledcardimg : styles.cardimg}
      />
      {visualState !== 'disabled' && (
        <button className={styles.checkbox({ state: visualState })}>
          {visualState === 'selected' ? number : ''}
        </button>
      )}
    </div>
  );
};

export default CardImage;
