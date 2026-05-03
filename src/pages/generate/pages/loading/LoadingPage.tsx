import { useEffect, useRef, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useNavigate } from 'react-router-dom';

import { usePostCarouselHateMutation } from '@pages/generate/apis/mutations/useCarouselHateMutation';
import { usePostCarouselLikeMutation } from '@pages/generate/apis/mutations/useCarouselLikeMutation';
import { useStackDataQuery } from '@pages/generate/apis/queries/useStackDataQuery';
import { useGenerateStore } from '@pages/generate/stores/useGenerateStore';

import { ROUTES } from '@routes/paths';

import { TOAST_TYPE } from '@shared/types/toast';

import DislikeButton from '@components/button/likeButton/DislikeButton';
import LikeButton from '@components/button/likeButton/LikeButton';
import FeatureErrorFallback from '@components/errorFallback/FeatureErrorFallback';
import Loading from '@components/loading/Loading';
import TitleNavBar from '@components/navBar/TitleNavBar';
import { useToast } from '@components/toast/useToast';

import { useErrorHandler } from '@hooks/useErrorHandler';

import { useGenerateImageRequest } from './hooks/useGenerateImageRequest';
import * as styles from './LoadingPage.css';
import ProgressBar from './ProgressBar';

const ANIMATION_DURATION = 600; // 캐러셀 애니메이션 지속 시간 (ms)

// TODO: 커스텀 훅, 유틸함수로 빼기, 기능 별 커스텀 훅 분할 시급
const LoadingPage = () => {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler('generate');
  const { notify } = useToast();

  // Zustand store: 이미지 생성 완료 상태 및 결과 데이터
  // TODO: 해당 store는 props로 대체 가능, 없애기
  const { isApiCompleted, navigationData, resetGenerate } = useGenerateStore();

  // LoadingPage 진입 시 이전 이미지 생성 상태 초기화 (이미지 재생성 시 이전 이미지를 보여주는 버그 방지)
  // useRef로 첫 렌더링 시 동기적으로 실행 -> ProgressBar보다 먼저 초기화
  const hasResetRef = useRef(false);
  if (!hasResetRef.current) {
    resetGenerate();
    hasResetRef.current = true;
  }

  // 진입경로(useImageFlowStore.preset)에 따라 적합한 mutation + payload 결정
  // - 풀퍼널: useFunnelStore 데이터로 풀퍼널 이미지 생성 payload 조립
  // - 숏퍼널: 프리셋 데이터(useImageFlowStore.preset) + 퍼널의 도면 데이터(useFunnelStore.floorPlan)로 배너/다른 스타일로 이미지 생성 payload 조립
  const requestState = useGenerateImageRequest();

  // 이미지 생성 payload에 필요한 데이터가 정상적으로 구성되어 있으면 true
  const isRequestValid = requestState.kind !== 'invalid';

  // 캐러셀 페이지네이션 (무한 스크롤) - 스택 UI
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 스택 UI 투표 중 상태
  const [isVoting, setIsVoting] = useState(false);

  // 캐러셀 애니메이션 상태 - 스택 UI
  const [animating, setAnimating] = useState(false);
  const [selected, setSelected] = useState<'like' | 'dislike' | null>(null);

  // 애니메이션 타이머 정리용 ref
  const transitionTimeoutRef = useRef<number | null>(null);

  const {
    data: currentImages,
    isPending,
    isError,
  } = useStackDataQuery(currentPage, {
    enabled: isRequestValid,
    onSuccess: () => setCurrentIndex(0), // 새 페이지 로드 시 첫 이미지부터 시작
    onError: (err) => handleError(err, 'loading'),
  });

  const { data: nextImages } = useStackDataQuery(currentPage + 1, {
    enabled: !!currentImages && isRequestValid,
  });

  const likeMutation = usePostCarouselLikeMutation();
  const hateMutation = usePostCarouselHateMutation();

  // 진입경로별 mutation 호출 (풀퍼널 / banner / otherStyle 분기)
  useEffect(() => {
    const onMutationError = (error: Error) => {
      console.error('이미지 생성 실패:', error);
      handleError(error, 'loading');
    };

    switch (requestState.kind) {
      case 'invalid':
        console.error('invalid requestState kind');
        return;
      case 'fullFunnel':
        requestState.mutate(requestState.payload, { onError: onMutationError });
        return;
      case 'banner':
        requestState.mutate(requestState.payload, { onError: onMutationError });
        return;
      case 'otherStyle':
        requestState.mutate(requestState.payload, { onError: onMutationError });
        return;
    }
  }, [handleError, requestState]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const hasError =
    isError ||
    (!isPending && !currentImages) ||
    !currentImages ||
    currentImages.length === 0;

  // 정상 데이터(normal data)일 때 현재/다음 이미지 계산
  const currentImage = hasError ? null : currentImages[currentIndex];

  const isLast = hasError ? false : currentIndex === currentImages.length - 1;

  const nextImage = hasError
    ? null
    : !isLast
      ? currentImages[currentIndex + 1]
      : nextImages && nextImages.length > 0
        ? nextImages[0]
        : undefined;

  const handleProgressComplete = () => {
    if (navigationData && isApiCompleted) {
      // ResultPage 변수명/엔드포인트 정리는 별도 작업으로 분리
      // TODO: 백엔드가 모든 이미지 생성 응답에 imageUrl을 추가하면 swagger 재생성
      // url에 imageId 전달, navigate state에 imageUrl 전달
      // -> ResultPage가 imageId로 이미지 상세조회 API fetch 응답 도착 전 즉시 이미지 표시 가능(location.state에 imageUrl이 있으니까) -> UX 개선
      // +) 새로고침하면 imageId는 url에 유지되지만 브라우저에 따라 location.state 날아가는데, 그때는 ResultPage의 기본동작(imageId로 이미지 상세조회 API 요청) 실행됨
      // LoadingPage + ResultPage 묶어서 별도 PR로 작업하기
      const imageId = (navigationData as { imageId?: number })?.imageId;
      if (typeof imageId !== 'number') return;
      navigate(`${ROUTES.GENERATE_RESULT}?houseId=${imageId}`, {
        replace: true,
      });
    }
  };

  const handleVote = (isLike: boolean) => {
    // 로딩 중 or 투표 중에는 투표(vote) 불가
    if (isPending || isVoting) return;

    if (!currentImage) return;
    setIsVoting(true);

    // 선택 상태 업데이트 (버튼 하이라이트)
    setSelected(isLike ? 'like' : 'dislike');

    // API 호출: 좋아요/별로예요 전송
    const mutation = isLike ? likeMutation.mutate : hateMutation.mutate;

    mutation(currentImage.carouselId, {
      onSuccess: () => {
        setAnimating(true);

        // 기존 타이머 정리
        if (transitionTimeoutRef.current !== null) {
          window.clearTimeout(transitionTimeoutRef.current);
        }

        // 600ms 후 다음 이미지로 전환
        transitionTimeoutRef.current = window.setTimeout(() => {
          // 현재 페이지에 다음 이미지가 있으면 인덱스 증가
          if (!isLast) {
            setSelected(null);
            setCurrentIndex((prev) => prev + 1);
          }
          // 마지막 이미지면 다음 페이지로 이동
          else {
            if (nextImages && nextImages.length > 0) {
              setSelected(null);
              setCurrentPage((prev) => prev + 1);
              setCurrentIndex(0);
            } else {
              // console.log('마지막 페이지 도달');
            }
          }

          setAnimating(false);
          setIsVoting(false);
          transitionTimeoutRef.current = null;
        }, ANIMATION_DURATION);
      },
      onError: () => {
        notify({
          text: '잠시 오류가 발생했어요. 다시 시도해주세요.',
          type: TOAST_TYPE.WARNING,
        });
        setSelected(null);
        setIsVoting(false);
      },
    });
  };

  // early return
  // store에서 payload 조립 실패 시(직접 URL 접근, 데이터 손실 등) HOME으로 리다이렉트
  // (ImageSetupPage의 entryRoute 가드와 동일하게 HOME fallback)
  if (requestState.kind === 'invalid') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <main className={styles.pageLayout}>
      <TitleNavBar
        title="스타일링 이미지 생성"
        isBackIcon={false}
        isLoginBtn={false}
      />
      <ErrorBoundary FallbackComponent={FeatureErrorFallback}>
        {isPending ? (
          <Loading />
        ) : (
          <div className={styles.wrapper}>
            <section className={styles.infoSection}>
              <ProgressBar onComplete={handleProgressComplete} />
              <p className={styles.infoText}>
                마음에 드는 가구를 선택하면, <br />
                하우미가 사용자님의 취향을 더 잘 이해할 수 있어요!
              </p>
            </section>

            <section className={styles.carouselSection}>
              <div className={styles.imageContainer}>
                {hasError ? (
                  // 에러 상황: 에러 메시지 표시
                  <div className={styles.errorMessage}>
                    <p>이미지를 불러올 수 없습니다</p>
                  </div>
                ) : (
                  // 정상 상황: 이미지 캐러셀 표시
                  <>
                    {nextImage && (
                      <div
                        key={`next-${currentPage + 1}-${nextImage.carouselId}`}
                        className={`${styles.nextImageArea} ${
                          animating ? styles.nextImageAreaActive : ''
                        }`}
                      >
                        <img
                          src={nextImage.url}
                          alt={`다음 가구 이미지 ${nextImage.carouselId}`}
                          className={styles.imageStyle}
                        />
                      </div>
                    )}

                    {currentImage && (
                      <div
                        key={`current-${currentPage}-${currentImage.carouselId}`}
                        className={`${styles.currentImageArea} ${
                          animating ? styles.currentImageAreaOut : ''
                        }`}
                      >
                        <img
                          src={currentImage.url}
                          alt={`현재 가구 이미지 ${currentImage.carouselId}`}
                          className={styles.imageStyle}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {!hasError && (
                <div className={styles.buttonGroup}>
                  <LikeButton
                    onClick={() => handleVote(true)}
                    isSelected={selected === 'like'}
                    disabled={isVoting || animating}
                  >
                    좋아요
                  </LikeButton>
                  <DislikeButton
                    onClick={() => handleVote(false)}
                    isSelected={selected === 'dislike'}
                    disabled={isVoting || animating}
                  >
                    별로예요
                  </DislikeButton>
                </div>
              )}
            </section>
          </div>
        )}
      </ErrorBoundary>
    </main>
  );
};

export default LoadingPage;
