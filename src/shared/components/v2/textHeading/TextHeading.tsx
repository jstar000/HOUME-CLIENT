import * as styles from './TextHeading.css';

interface TextHeadingProps {
  type: 'MAIN' | 'SUB' | 'POPUP/MODAL' | 'BOTTOMSHEET';
  showCaption?: boolean; // True: ON, False: OFF
  title?: string;
  caption?: string;
}

const TextHeading = ({
  type = 'MAIN',
  showCaption = false,
  title = '제목을 입력하는 공간이에요.',
  caption = '설명을 입력하는 공간이에요.',
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
