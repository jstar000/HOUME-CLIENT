import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/lottie/loading.json';

const LoadingLottie = () => (
  <div>
    <Lottie
      animationData={loadingAnimation}
      loop
      autoPlay
      style={{ width: 300, height: 300 }}
    />
  </div>
);

export default LoadingLottie;
