/**
 * 카카오 OAuth 콜백 처리 컴포넌트
 *
 * 카카오 로그인 후 리다이렉트되는 콜백 페이지입니다.
 * URL 파라미터에서 인가 코드를 추출하여 로그인 API를 호출합니다.
 *
 * 로그인 흐름:
 * 1. 카카오 로그인 버튼 클릭 → 카카오 인증 페이지로 이동
 * 2. 사용자 인증 완료 → 이 컴포넌트로 리다이렉트 (인가 코드 포함)
 * 3. 인가 코드 추출 → 서버에 로그인 요청
 * 4. 로그인 성공 → 홈페이지로 이동
 *
 * @example
 * URL: /oauth/kakao/callback?code=authorization_code
 */
import { useEffect } from 'react';
import { useKakaoLogin } from './hooks/useKakaoLogin';

const KakaoCallback = () => {
  // Tanstack Query - useKakaoLogin 훅 호출
  const { mutate: kakaoLogin, isPending, isError, error } = useKakaoLogin();

  useEffect(() => {
    // URL에서 카카오 인가 코드 추출
    const code = new URL(window.location.href).searchParams.get('code');
    // console.log('[KakaoCallback] 인가 코드:', code);

    if (code) {
      // 인가 코드로 로그인 요청
      kakaoLogin(code);
    } else {
      console.error('[KakaoCallback] 인가 코드가 없습니다.');
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }, [kakaoLogin]);

  if (isPending) {
    return <div>카카오 로그인 처리 중...</div>;
  }

  if (isError) {
    return (
      <div>
        <div>로그인에 실패했습니다</div>
        <div>
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
