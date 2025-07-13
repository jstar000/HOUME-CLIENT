// Step 4
import type { ImageGenerateSteps } from '../../types/funnel';

interface Step4MainActivityProps {
  context: ImageGenerateSteps['MainActivity'];
}

const Step4MainActivity = ({ context }: Step4MainActivityProps) => {
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

export default Step4MainActivity;
