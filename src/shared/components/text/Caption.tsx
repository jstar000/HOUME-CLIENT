import { captionBox, textVariants } from './Caption.css';

const Caption = () => {
  return (
    <div className={captionBox}>
      <span className={textVariants.strong}>휴식형</span>
      <span className={textVariants.normal}>을 선택하면</span>
      <span className={textVariants.highlight}>소파</span>
      <span className={textVariants.normal}>가 이미지에 포함돼요.</span>
    </div>
  );
};

export default Caption;
