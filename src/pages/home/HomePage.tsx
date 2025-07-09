import NoMatchButton from '@/shared/components/button/noMatchButton/noMatchButton';
import { ERROR_MESSAGES } from '@/shared/constants/clientErrorMessage';

const HomePage = () => {
  return (
    <div
      style={{
        padding: '3rem',
        display: 'flex',
        backgroundColor: '#BDBDBD',
      }}
    >
      <NoMatchButton message={ERROR_MESSAGES.NO_FLOORPLAN} />
    </div>
  );
};

export default HomePage;
