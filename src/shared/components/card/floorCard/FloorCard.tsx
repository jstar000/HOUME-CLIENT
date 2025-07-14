import * as styles from './FloorCard.css.ts';

interface FloorCardProps extends React.ComponentProps<'div'> {
  src: string;
  selected?: boolean;
}

const FloorCard = ({ src, selected = false }: FloorCardProps) => {
  return (
    <div className={`${styles.container} ${selected ? styles.selected : ''}`}>
      <img src={src} className={styles.floorimg} alt="카드 이미지" />
    </div>
  );
};

export default FloorCard;
