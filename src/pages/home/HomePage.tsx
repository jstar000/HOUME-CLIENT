import ShowErrorMessage from '@/shared/components/button/show_error/showError';
import { ERROR_MESSAGES } from '@/shared/constants/clientErrorMessage';

const HomePage = () => {
  return (
    <div
      style={{
        padding: '3rem',
        display: 'flex',
      }}
    >
      <ShowErrorMessage message={ERROR_MESSAGES.APARTMENT_IMPOSSIBLE} />
    </div>
  );
};

export default HomePage;
