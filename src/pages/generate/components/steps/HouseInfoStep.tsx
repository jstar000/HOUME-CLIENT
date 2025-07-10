// Step 1
import { useHouseInfoStep } from '../../hooks/useHouseInfoStep.hooks';
import type {
  HouseType,
  ImgGenerateSteps,
  RoomSize,
  RoomType,
} from '../../types/funnel.types';

interface HouseInfoStepProps {
  context: ImgGenerateSteps['HouseInfo'];
  onNext: (data: Required<ImgGenerateSteps['HouseInfo']>) => void;
}

const HouseInfoStep = ({ context, onNext }: HouseInfoStepProps) => {
  const { formData, setFormData, errors, handleSubmit, isValid } =
    useHouseInfoStep(context);

  return (
    <div>
      <h2>집 정보 선택</h2>

      <div>
        <label>주거 형태</label>
        <select
          value={formData.houseType}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              houseType: e.target.value as HouseType,
            }))
          }
        >
          <option value="office">오피스텔</option>
          <option value="villa">빌라</option>
          <option value="apartment">아파트</option>
          <option value="other">기타</option>
        </select>
        {errors.houseType && (
          <span style={{ color: 'red' }}>{errors.houseType}</span>
        )}
      </div>

      <div>
        <label>방 구조</label>
        <select
          value={formData.roomType}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              roomType: e.target.value as RoomType,
            }))
          }
        >
          <option value="openOne">오픈형 원룸</option>
          <option value="separateOne">분리형 원룸</option>
          <option value="duplex">복층</option>
          <option value="two">투룸</option>
          <option value="threeAbove">쓰리룸 이상</option>
        </select>
        {errors.roomType && (
          <span style={{ color: 'red' }}>{errors.roomType}</span>
        )}
      </div>

      <div>
        <label>평형</label>
        <select
          value={formData.roomSize}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              roomSize: e.target.value as RoomSize,
            }))
          }
        >
          <option value="fiveOrLess">5평 이하</option>
          <option value="sixToTen">6-10평</option>
          <option value="tenToFifteen">10-15평</option>
          <option value="sixteenAbove">16평 이상</option>
        </select>
        {errors.roomSize && (
          <span style={{ color: 'red' }}>{errors.roomSize}</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => handleSubmit(onNext)}
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? '#007bff' : '#ccc',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      >
        다음 단계
      </button>
    </div>
  );
};

export default HouseInfoStep;
