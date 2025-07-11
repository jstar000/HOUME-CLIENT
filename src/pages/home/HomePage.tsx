import { useNavigate } from 'react-router-dom';
import LogoutButton from '../login/components/LogoutButton';
import TokenRefreshTest from '../login/components/TokenRefreshTest';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <TokenRefreshTest />
      <LogoutButton />
      <br />
      <button onClick={() => navigate('/signup')}>Signup</button>
      <br />
      <br />
      <button onClick={() => navigate(0)}>새로고침</button>
    </div>
  );
};

export default HomePage;
