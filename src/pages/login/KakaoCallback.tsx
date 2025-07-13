import { useEffect } from 'react';
import { useKakaoLogin } from './hooks/useKakaoLogin';

const KakaoCallback = () => {
  const { mutate: kakaoLogin, isPending, isError, error } = useKakaoLogin();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('[KakaoCallback] 인가 코드:', code);

    if (code) {
      kakaoLogin(code);
    } else {
      console.error('[KakaoCallback] 인가 코드가 없습니다.');
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }, [kakaoLogin]);

  if (isPending) {
    return (
      <div>
        <div>카카오 로그인 처리 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div>로그인에 실패했습니다</div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다'}
        </div>
      </div>
    );
  }

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
