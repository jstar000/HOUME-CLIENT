// ------------------------------
// 앱 라우팅 설정 파일
// ------------------------------
// React Router v7의 createBrowserRouter 패턴을 사용하여
// 1) RootLayout       : 모든 페이지의 공통 레이아웃(헤더·푸터) + <Outlet />
// 2) 공개 라우트      : Home, Login, Signup
// 3) ProtectedRoute   : 인증이 필요한 하위 라우트 묶음
//    - 인증 실패 시 ROUTES.LOGIN 으로 리다이렉트
//
// isAuthenticated 는 임시 하드코딩 값이며, 추후 useAuth 훅 등의 실제 인증 상태로 교체될 예정입니다.
// ------------------------------
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import RootLayout from '@/layout/RootLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import GeneratePage from '@/pages/generate/GeneratePage';
import MyPage from '@/pages/mypage/MyPage';

// TODO: Replace with actual auth state management
const isAuthenticated = false;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // ✅ index 라우트: 부모('/')와 정확히 일치할 때 기본으로 표시할 페이지입니다.
      //    path 속성을 쓰지 않고 index:true 로 표현하면 의도가 명확해집니다.
      {
        index: true,
        element: <HomePage />, // 홈 화면
      },
      // --- 공개 라우트(로그인/회원가입) ----------------------------
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      // --- 보호 라우트 그룹 ---------------------------------------
      // ProtectedRoute 를 중간 노드로 둬서 하위 children 모두를 한 번에 가드합니다.
      //    isAuthenticated 값이 false 이면 ROUTES.LOGIN 으로 리다이렉트됩니다.
      {
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />, // 라우트 가드
        children: [
          {
            path: ROUTES.ONBOARDING,
            element: <OnboardingPage />,
          },
          {
            path: ROUTES.GENERATE,
            element: <GeneratePage />,
          },
          {
            path: ROUTES.MYPAGE,
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);
