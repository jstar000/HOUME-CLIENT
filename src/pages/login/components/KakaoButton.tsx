import { KAKAO_AUTH_URL } from '../constants/kakaoLoginPath';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

const KakaoButton = () => {
  const handleLogin = () => {
    // 외부 URL로 리다이렉트하기 위해 window.location.href 사용
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <CtaButton typeVariant="kakao" onClick={handleLogin}>
        카카오 로그인
      </CtaButton>
    </div>
  );
};

export default KakaoButton;
