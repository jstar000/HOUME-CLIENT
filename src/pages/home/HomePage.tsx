import LogoutButton from '../login/components/LogoutButton';
import TokenRefreshTest from '../login/components/TokenRefreshTest';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <TokenRefreshTest />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
