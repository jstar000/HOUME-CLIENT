import { toast } from 'react-toastify';

const Toast = () => {
  const notify = () => toast('하우미 토스트 테스트');
  return (
    <div>
      <button type="button" onClick={notify}>
        Toast!
      </button>
    </div>
  );
};

export default Toast;
