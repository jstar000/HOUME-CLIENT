import { captionBox, highlight, strongText, normalText } from './Caption.css';

export const Caption = () => {
  return (
    <div className={captionBox}>
      <span className={strongText}>휴식형</span>
      <span className={normalText}>을 선택하면</span>
      <span className={highlight}>소파</span>
      <span className={normalText}>가 이미지에 포함돼요.</span>
    </div>
  );
};
