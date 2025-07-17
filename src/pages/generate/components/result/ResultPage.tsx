import { useState } from 'react';
import BlurImage from '@assets/icons/recommendBlur.svg?react';
import LockImage from '@assets/icons/recommendCta.png';
import { overlay } from 'overlay-kit';
import { useLocation, useSearchParams, Navigate } from 'react-router-dom';
import * as styles from './ResultPage.css';
import {
  useFurnitureLogMutation,
  usePreferenceMutation,
  useCreditLogMutation,
  useResultData,
} from '../../hooks/useGenerate';
import type { GenerateImageData } from '../../types/GenerateType';
import LikeButton from '@/shared/components/button/likeButton/LikeButton';
import DislikeButton from '@/shared/components/button/likeButton/DislikeButton';
import HeadingText from '@/shared/components/text/HeadingText';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import Modal from '@/shared/components/overlay/modal/Modal';
import Loading from '@/shared/components/loading/Loading';

const ResultPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Hook들을 최상단에 배치
  const [selected, setSelected] = useState<'like' | 'dislike' | null>(null);

  // 1차: location.state에서 데이터 가져오기 (정상적인 플로우)
  let result = (location.state as { result?: GenerateImageData })?.result;

  // 2차: query parameter에서 imageId 가져와서 API 호출 (직접 접근 시)
  const imageId = searchParams.get('imageId');
  const shouldFetchFromAPI = !result && !!imageId;
  const { data: apiResult, isLoading } = useResultData(Number(imageId || 0));

  // state 또는 API에서 가져온 데이터 사용 (API 호출이 필요한 경우만)
  if (shouldFetchFromAPI) {
    result = apiResult as GenerateImageData;
  }

  // result가 있을 때만 mutation hook들 호출 (조건부 렌더링을 위해)
  const { mutate: sendPreference } = usePreferenceMutation(
    result?.imageId || 0
  );
  const { mutate: sendFurnituresLogs } = useFurnitureLogMutation();
  const { mutate: sendCreditLogs } = useCreditLogMutation();

  // 로딩 중이면 로딩 표시
  if (!result && isLoading) {
    return <Loading text="결과를 불러오는 중..." />;
  }

  // 여전히 데이터가 없으면 홈으로 리다이렉션
  if (!result) {
    console.error('Result data is missing');
    return <Navigate to="/" replace />;
  }

  const handleVote = (isLike: boolean) => {
    setSelected(isLike ? 'like' : 'dislike');
    sendPreference(
      { isLike },
      {
        onSuccess: () => {
          console.log('성공');
        },
        onError: (e) => {
          console.error(e);
        },
      }
    );
  };

  const handleOpenModal = () => {
    overlay.open(({ unmount }) => (
      <Modal
        onClose={unmount}
        title={`스타일링 이미지대로 가구를\n추천 받으려면 크레딧이 필요해요`}
        onCreditAction={sendCreditLogs} // 크레딧 액션 콜백 전달
      />
    ));
    sendFurnituresLogs();
  };

  // if (isLoading) return <div>로딩중</div>;
  // if (isError || !data) return <div>에러 발생!</div>;

  return (
    <div className={styles.wrapper}>
      <section className={styles.headerSection}>
        <HeadingText title="이미지 생성이 완료됐어요!" content="" />
        <div className={styles.infoSection}>
          <p className={styles.infoText}>
            {`${result.equilibrium}에 거주하며 ${result.tagName}한 취향을 가진\n${result.name}님을 위한 맞춤 인테리어 스타일링이에요!`}
          </p>
        </div>
      </section>
      <section className={styles.resultSection}>
        <img
          src={result.imageUrl}
          alt={`${result.name}님을 위한 맞춤 인테리어 스타일링`}
          className={styles.imgArea({ mirrored: result.isMirror })}
        />
        <div className={styles.buttonGroup}>
          <LikeButton
            size={'large'}
            onClick={() => handleVote(true)}
            isSelected={selected === 'like'}
          >
            만족스러워요
          </LikeButton>
          <DislikeButton
            size={'large'}
            onClick={() => handleVote(false)}
            isSelected={selected === 'dislike'}
          >
            아쉬워요
          </DislikeButton>
        </div>
      </section>
      <section className={styles.curationSection}>
        <div className={styles.textContainer}>
          <p className={styles.headerText}>생성한 이미지처럼 방을 꾸며봐요</p>
          <p className={styles.bodyText}>
            이미지의 분위기를 기반으로, <br />
            좋아하실 만한 가구를 골라봤어요!
          </p>
        </div>
        <div className={styles.premiumContentSection}>
          <BlurImage />
          <div className={styles.unlockSection}>
            <img src={LockImage} alt="자물쇠 아이콘" role="presentation" />
            <CtaButton
              aria-label="프리미엄 가구 추천 기능 잠금 해제"
              buttonSize={'small'}
              onClick={handleOpenModal}
            >
              가구 추천받기
            </CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultPage;
