const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code
&scope=profile_nickname,account_email`;
