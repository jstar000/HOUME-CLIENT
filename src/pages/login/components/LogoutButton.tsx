import { logout } from '../apis/logout';

const LogoutButton = () => {
  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default LogoutButton;
