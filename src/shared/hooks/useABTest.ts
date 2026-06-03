/**
 * A/B 테스트 variant 배정 훅
 *
 * 1. localStorage에 배정값이 있으면 로그인 여부와 관계없이 유지 (퍼널 전환 비교용)
 * 2. 없고 userId가 있으면 홀수 A / 짝수 B 배정 후 저장
 * 3. 없고 비로그인이면 50% 랜덤 배정 후 저장
 *
 * UI 의미(예: solid/ghost CTA)는 사용처에서 variant → 설정으로 매핑
 * Firebase Analytics 연동은 GA 작업 브랜치에서 추가 예정
 */

import { useEffect, useState } from 'react';

import { useUserStore } from '@store/useUserStore';

import type { ABTestGroup } from '@shared/types/abTest';
import { AB_TEST_STORAGE_KEY, DEFAULT_AB_VARIANT } from '@shared/types/abTest';

export type { ABTestGroup };

const isABTestGroup = (value: string): value is ABTestGroup =>
  value === 'A' || value === 'B';

const getVariantFromUserId = (userId: number): ABTestGroup =>
  userId % 2 === 1 ? 'A' : 'B';

const assignRandomVariant = (): ABTestGroup =>
  Math.random() < 0.5 ? 'A' : 'B';

const readVariantFromStorage = (): ABTestGroup | null => {
  try {
    const cached = localStorage.getItem(AB_TEST_STORAGE_KEY);
    return cached && isABTestGroup(cached) ? cached : null;
  } catch {
    return null;
  }
};

const writeVariantToStorage = (variant: ABTestGroup): void => {
  localStorage.setItem(AB_TEST_STORAGE_KEY, variant);
};

/** 개발 모드에서 variant 고정. 'A' | 'B' 또는 null */
const DEV_FIXED_VARIANT: ABTestGroup | null = import.meta.env.DEV ? null : null;

/**
 * 배정 우선순위: DEV 고정 → storage 유지 → (신규) userId 홀짝 → (신규) 비로그인 50% 랜덤
 */
const resolveABVariant = (userId: number | null | undefined): ABTestGroup => {
  if (DEV_FIXED_VARIANT) {
    return DEV_FIXED_VARIANT;
  }

  const cached = readVariantFromStorage();
  if (cached) {
    return cached;
  }

  const assigned =
    userId !== null && userId !== undefined
      ? getVariantFromUserId(userId)
      : assignRandomVariant();

  try {
    writeVariantToStorage(assigned);
  } catch {
    // localStorage 저장 실패 시 무시
  }

  return assigned;
};

const getInitialVariant = (): ABTestGroup => {
  if (DEV_FIXED_VARIANT) {
    return DEV_FIXED_VARIANT;
  }
  return readVariantFromStorage() ?? DEFAULT_AB_VARIANT;
};

export const useABTest = () => {
  const userId = useUserStore((state) => state.userId);

  const [variant, setVariant] = useState<ABTestGroup>(getInitialVariant);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeABTest = () => {
      try {
        setIsLoading(true);
        setError(null);
        setVariant(resolveABVariant(userId));
      } catch (err) {
        console.error('A/B 테스트 초기화 실패:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');

        try {
          const cached = readVariantFromStorage();
          setVariant(
            cached ??
              (userId !== null && userId !== undefined
                ? getVariantFromUserId(userId)
                : DEFAULT_AB_VARIANT)
          );
        } catch {
          console.error('Fallback 실패, 기본값 사용');
          setVariant(DEFAULT_AB_VARIANT);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeABTest();
  }, [userId]);

  return {
    variant,
    isLoading,
    error,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
  };
};
