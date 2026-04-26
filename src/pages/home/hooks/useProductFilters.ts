import { useCallback, useEffect, useMemo, useState } from 'react';

import { useFilterListQuery } from '@pages/home/apis/queries/useFilterListQuery';
import type { ProductFilterChipCategory } from '@pages/home/components/product/SearchSection/SearchSection';
import {
  ALL_FILTER_SENTINEL,
  buildAppliedFilterChips,
  buildFilterMeta,
  isSelectedForRender,
  toDraftFromExternal,
  toExternalFromDraft,
  toggleSectionSelection,
} from '@pages/home/utils/productFilterUtils';
import type {
  ColorFilterOption,
  DraftFilterValues,
  FilterOption,
  FilterSectionKey,
  FilterSummaryMeta,
  ProductFilterValues,
} from '@pages/home/utils/productFilterUtils';

/**
 * 최초 적용 상태는 "전체(ALL 센티널)"로 둔다.
 * 실제 시트 렌더에서는 API의 allId로 다시 정규화된다.
 */
const INITIAL_FILTER_VALUES: ProductFilterValues = {
  furnitureTypeIds: [ALL_FILTER_SENTINEL],
  priceRangeIds: [ALL_FILTER_SENTINEL],
  colorIds: [ALL_FILTER_SENTINEL],
};

/**
 * 필터 도메인 전용 훅
 * - 필터 옵션(API) + draft/applied 상태 + 변환 규칙 + 요약칩 계산을 한 곳에 모은다.
 * - ProductTab/useProductTabState는 UI 흐름만 담당하고, 필터 로직은 이 훅만 바라보게 하는 것이 목적.
 */
const useProductFilters = () => {
  /** 필터 옵션 원본 API */
  const { data: filterData } = useFilterListQuery();

  /** 실제 적용 중인 값(상단 칩/검색 조건의 기준) */
  const [appliedValues, setAppliedValues] = useState<ProductFilterValues>(
    INITIAL_FILTER_VALUES
  );

  /** 바텀시트에서 편집 중인 임시 값(적용 전) */
  const [draftValues, setDraftValues] = useState<DraftFilterValues>({
    furniture: [ALL_FILTER_SENTINEL],
    price: [ALL_FILTER_SENTINEL],
    color: [ALL_FILTER_SENTINEL],
  });

  /** 가구 섹션 렌더용 옵션 */
  const furnitureOptions = useMemo<FilterOption[]>(
    () =>
      (filterData?.furnitureTypes ?? [])
        .filter((type) => type.id != null && !!type.nameKr)
        .map((type) => ({
          id: String(type.id),
          label: type.nameKr as string,
        })),
    [filterData?.furnitureTypes]
  );

  /** 가격 섹션 렌더용 옵션 */
  const priceOptions = useMemo<FilterOption[]>(
    () =>
      (filterData?.priceRanges ?? [])
        .filter((range) => !!range.id && !!range.label)
        .map((range) => ({
          id: range.id as string,
          label: range.label as string,
        })),
    [filterData?.priceRanges]
  );

  /** 색상 섹션 렌더용 옵션(컬러칩 value 포함) */
  const colorOptions = useMemo<ColorFilterOption[]>(
    () =>
      (filterData?.colors ?? [])
        .filter((color) => color.id != null && !!color.label)
        .map((color) => ({
          id: String(color.id),
          label: color.label as string,
          value: color.value ?? undefined,
        })),
    [filterData?.colors]
  );

  /** 가구 섹션 요약 계산 메타(라벨 맵/순서/allId) */
  const furnitureMeta = useMemo<FilterSummaryMeta>(() => {
    return buildFilterMeta(
      (filterData?.furnitureTypes ?? []).map((item) => ({
        id: item.id ?? undefined,
        label: item.nameKr ?? undefined,
      }))
    );
  }, [filterData?.furnitureTypes]);

  /** 가격 섹션 요약 계산 메타 */
  const priceMeta = useMemo<FilterSummaryMeta>(() => {
    return buildFilterMeta(
      (filterData?.priceRanges ?? []).map((item) => ({
        id: item.id ?? undefined,
        label: item.label ?? undefined,
      }))
    );
  }, [filterData?.priceRanges]);

  /** 색상 섹션 요약 계산 메타 */
  const colorMeta = useMemo<FilterSummaryMeta>(() => {
    return buildFilterMeta(
      (filterData?.colors ?? []).map((item) => ({
        id: item.id ?? undefined,
        label: item.label ?? undefined,
      }))
    );
  }, [filterData?.colors]);

  /** 섹션별 "전체" 실제 id 묶음 */
  const allIds = useMemo(
    () => ({
      furniture: furnitureMeta.allId,
      price: priceMeta.allId,
      color: colorMeta.allId,
    }),
    [colorMeta.allId, furnitureMeta.allId, priceMeta.allId]
  );

  /**
   * allId가 API 응답으로 확정/변경되면 draft를 안전하게 다시 정규화한다.
   * (예: 초기 ALL 센티널 상태 -> 실제 allId로 치환)
   */
  useEffect(() => {
    setDraftValues((prev) =>
      toDraftFromExternal(toExternalFromDraft(prev, allIds), allIds)
    );
  }, [allIds]);

  /** 적용값(applied)을 현재 편집값(draft)으로 복사 (시트 열 때 사용) */
  const syncDraftFromApplied = useCallback(() => {
    setDraftValues(toDraftFromExternal(appliedValues, allIds));
  }, [allIds, appliedValues]);

  /** 시트 내부만 초기화: 섹션별 전체 선택 상태로 복원 */
  const resetDraft = useCallback(() => {
    setDraftValues({
      furniture: allIds.furniture ? [allIds.furniture] : [ALL_FILTER_SENTINEL],
      price: allIds.price ? [allIds.price] : [ALL_FILTER_SENTINEL],
      color: allIds.color ? [allIds.color] : [ALL_FILTER_SENTINEL],
    });
  }, [allIds.color, allIds.furniture, allIds.price]);

  /** 시트에서 칩 선택/해제 토글 */
  const toggleDraftChip = useCallback(
    (section: FilterSectionKey, id: string) => {
      setDraftValues((prev) => ({
        ...prev,
        [section]: toggleSectionSelection(prev[section], id, allIds[section]),
      }));
    },
    [allIds]
  );

  /**
   * draft -> applied 확정
   * - 외부 계약값으로 변환 후 저장
   * - 디버깅을 위해 최종 적용값 로그 출력
   */
  const applyDraft = useCallback(() => {
    const nextValues = toExternalFromDraft(draftValues, allIds);
    console.log('[ProductTab] apply filters:', {
      selectedValues: nextValues,
    });
    setAppliedValues(nextValues);
  }, [allIds, draftValues]);

  /** 상단 적용칩(X) 제거: 해당 카테고리만 전체(ALL)로 되돌림 */
  const removeAppliedChip = useCallback(
    (category: ProductFilterChipCategory) => {
      setAppliedValues((prev) => ({
        furnitureTypeIds:
          category === 'furniture'
            ? [ALL_FILTER_SENTINEL]
            : [...prev.furnitureTypeIds],
        priceRangeIds:
          category === 'price'
            ? [ALL_FILTER_SENTINEL]
            : [...prev.priceRangeIds],
        colorIds:
          category === 'color' ? [ALL_FILTER_SENTINEL] : [...prev.colorIds],
      }));
    },
    []
  );

  /** SearchSection 상단에 보여줄 적용 칩(파생값) */
  const appliedFilterChips = useMemo(
    () =>
      buildAppliedFilterChips(
        appliedValues,
        furnitureMeta,
        priceMeta,
        colorMeta
      ),
    [appliedValues, colorMeta, furnitureMeta, priceMeta]
  );

  /** 현재 draft 기준으로 특정 칩의 selected 여부 계산 */
  const isChipSelected = useCallback(
    (section: FilterSectionKey, id: string) => {
      return isSelectedForRender(draftValues[section], id, allIds[section]);
    },
    [allIds, draftValues]
  );

  /** ProductTab/useProductTabState에서 소비할 공개 API */
  return {
    furnitureOptions,
    priceOptions,
    colorOptions,
    appliedFilterChips,
    appliedValues,
    syncDraftFromApplied,
    resetDraft,
    toggleDraftChip,
    applyDraft,
    removeAppliedChip,
    isChipSelected,
  };
};

export { useProductFilters };
export type { ProductFilterValues };
