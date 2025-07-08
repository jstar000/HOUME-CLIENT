import { KAKAO_AUTH_URL } from '../apis/KakaoLogin';

const KakaoButton = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <button onClick={handleLogin}>카카오 로그인</button>
    </div>
  );
};

export default KakaoButton;
