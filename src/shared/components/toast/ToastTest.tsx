import { toast } from 'react-toastify';
import Toast from './Toast';
import { TOAST_TYPE, toastStyle } from '@/shared/types/toast';

const ToastTest = () => {
  const notify = () => {
    toast(
      <Toast
        text="결제는 아직 준비 중인 기능이에요"
        type={TOAST_TYPE.WARNING}
      />,
      {
        ariaLabel: '경고 토스트',
        style: {
          ...toastStyle,
          marginBottom: '5rem',
        },
      }
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button type="button" onClick={notify}>
        토스트 띄우기
      </button>
    </div>
  );
};

export default ToastTest;
