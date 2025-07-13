// Step 4
import type { ImageGenerateSteps } from '../../types/funnel';

interface MainActivityStepProps {
  context: ImageGenerateSteps['MainActivity'];
}

const MainActivityStep = ({ context }: MainActivityStepProps) => {
  const handleSubmit = () => {
    const final = { ...context };
    console.log('최종: ', final);
  };

  return (
    <div>
      <span>{context.houseType}</span>
      <button type="button" onClick={handleSubmit}>
        결과 출력
      </button>
    </div>
  );
};

export default MainActivityStep;
