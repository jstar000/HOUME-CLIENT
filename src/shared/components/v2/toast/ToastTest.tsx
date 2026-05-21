import { TOAST_TYPE, TOASTER_ID } from '@shared/types/toast';

import MainToaster from './Sonner';
import { useToast } from './useToast';

const SonnerToastTest = () => {
  const { notify } = useToast();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      <MainToaster />

      <button
        type="button"
        onClick={() =>
          notify({
            text: '로그인에 성공했어요',
            type: TOAST_TYPE.SUCCESS,
            options: {
              toasterId: TOASTER_ID.TOP_4,
            },
          })
        }
      >
        로그인 성공
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: '로그인에 실패했어요. 다시 시도해주세요.',
            type: TOAST_TYPE.ERROR,
            options: {
              toasterId: TOASTER_ID.BOTTOM_8,
            },
          })
        }
      >
        로그인 실패
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: '필수 가구는 선택 해제할 수 없어요',
            type: TOAST_TYPE.INFO,
            options: {
              toasterId: TOASTER_ID.TOP_4,
              style: {
                marginTop: '4rem',
              },
            },
          })
        }
      >
        안내 토스트
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: '상품을 찜했어요! 찜한 상품으로 이동할까요?',
            type: TOAST_TYPE.ACTION,
            actionLabel: '이동',
            onClick: () => {
              console.log('찜 바로가기');
            },
            options: {
              toasterId: TOASTER_ID.BOTTOM_4,
              style: {
                marginBottom: '4rem',
              },
            },
          })
        }
      >
        찜 바로가기
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: '찜을 취소했어요',
            type: TOAST_TYPE.ACTION,
            actionLabel: '되돌리기',
            onClick: () => {
              console.log('찜 되돌리기');
            },
            options: {
              toasterId: TOASTER_ID.BOTTOM_4,
              style: {
                marginBottom: '4rem',
              },
            },
          })
        }
      >
        찜 되돌리기
      </button>
    </div>
  );
};

export default SonnerToastTest;
