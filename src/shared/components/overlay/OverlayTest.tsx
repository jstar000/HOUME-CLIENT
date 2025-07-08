import { overlay } from 'overlay-kit';
import Modal from './Modal';

const OverlayTest = () => {
  const handleOpenModal = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal isOpen={isOpen} onClose={close} onExit={unmount} />
    ));
  };

  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        모달창 열기
      </button>
    </div>
  );
};

export default OverlayTest;
