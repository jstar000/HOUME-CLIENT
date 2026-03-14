import * as styles from './TextHeading.css';

interface TextHeadingProps {
  type: 'MAIN' | 'SUB' | 'POPUP/MODAL' | 'BOTTOMSHEET';
  showCaption?: boolean; // True: ON, False: OFF
  title: string;
  caption?: string;
}

const TextHeading = ({
  type = 'MAIN',
  showCaption = false,
  title,
  caption,
}: TextHeadingProps) => {
  return (
    <div className={styles.wrapper({ type })}>
      <h2 className={styles.title({ type })}>{title}</h2>
      {showCaption && caption && (
        <p className={styles.caption({ type })}>{caption}</p>
      )}
    </div>
  );
};

export default TextHeading;
