import { KAKAO_AUTH_URL } from '../constants/kakaoLoginPath';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

const KakaoButton = () => {
  const handleLogin = () => {
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
