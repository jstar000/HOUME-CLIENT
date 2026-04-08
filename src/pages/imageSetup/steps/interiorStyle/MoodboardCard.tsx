import * as styles from './MoodboardCard.css';

interface MoodboardCardProps extends React.ComponentProps<'div'> {
  src: string;
  alt: string;
  selectOrder?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const MoodboardCard = ({
  src,
  alt,
  selectOrder = 0,
  disabled = false,
  onClick,
}: MoodboardCardProps) => {
  const isSelected = selectOrder > 0;

  // 상태 결정 우선순위: disabled > selected > default
  // pressed 인터랙션은 CSS :active 셀렉터로 처리 (v2 컨벤션)
  const visualState = disabled
    ? 'default' // disabled는 별도 variant
    : isSelected
      ? 'selected'
      : 'default';

  const cardState = disabled ? 'disabled' : visualState;

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div className={styles.card({ state: cardState })} onClick={handleClick}>
      <img src={src} alt={alt} className={styles.image} draggable={false} />
      {!disabled && (
        <div className={styles.checkbox({ state: visualState })}>
          <span className={styles.circle({ state: visualState })}>
            {isSelected ? selectOrder : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default MoodboardCard;
