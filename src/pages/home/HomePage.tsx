import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../login/components/LogoutButton';
import TokenRefreshTest from '../login/components/TokenRefreshTest';
import FloorPlan from '../onboarding/components/steps/step2/FloorPlan';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <FloorPlan />
    </div>
  );
};

export default HomePage;
