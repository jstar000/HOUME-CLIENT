import { overlay } from 'overlay-kit';
import Modal from './Modal';

export const OverlayTest = () => {
  const handleOpen = () => {
    overlay.open(({ isOpen, unmount }) => (
      <Modal
        isOpen={isOpen}
        onClose={unmount}
        title="스타일링 이미지대로 가구를 추천 받으려면 크레딧이 필요해요"
      />
    ));
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        모달창 열기
      </button>
    </div>
  );
};
