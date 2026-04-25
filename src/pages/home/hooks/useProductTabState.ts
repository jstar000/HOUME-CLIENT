import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useFilterListQuery } from '@pages/home/apis/queries/useFilterListQuery';
import type {
  ProductFilterValues,
  ProductFilterSheetRef,
} from '@pages/home/components/product/ProductFilterSheet/ProductFilterSheet';
import type {
  AppliedFilterChip,
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/components/product/SearchSection/SearchSection';

import { useToast } from '@components/toast/useToast';

const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

const ALL = 'ALL';

const INITIAL_FILTER_VALUES: ProductFilterValues = {
  furnitureTypeIds: [ALL],
  priceRangeIds: [ALL],
  colorIds: [ALL],
};

type FilterSummaryMeta = {
  labels: Record<string, string>;
  orderedOptionIds: string[];
  allId?: string;
};

// 바텀시트에 담을 수 있는 최대 선택 상품 수
export const MAX_SELECTED_PRODUCTS = 6;

// 선택값 배열에서 "대표 라벨 + 외 N개" 형태의 필터 라벨 생성
const buildSummaryLabel = (
  ids: string[],
  meta: FilterSummaryMeta
): string | null => {
  const selected = ids.filter((id) => id !== ALL && id !== meta.allId);
  if (selected.length === 0) return null;

  const selectedSet = new Set(selected);
  let firstId: string | undefined;
  for (const id of meta.orderedOptionIds) {
    if (id !== ALL && id !== meta.allId && selectedSet.has(id)) {
      firstId = id;
      break;
    }
  }
  if (firstId === undefined) {
    firstId = selected[0];
  }

  const first = meta.labels[firstId] ?? firstId;
  return selected.length === 1 ? first : `${first} 외 ${selected.length - 1}개`;
};

// 현재 선택 상태를 SearchSection 상단 칩(카테고리/가격대/색상) 데이터로 변환
const buildAppliedFilterChips = (
  values: ProductFilterValues,
  furnitureMeta: FilterSummaryMeta,
  priceMeta: FilterSummaryMeta,
  colorMeta: FilterSummaryMeta
): AppliedFilterChip[] => {
  const furnitureLabel = buildSummaryLabel(
    values.furnitureTypeIds,
    furnitureMeta
  );
  const priceLabel = buildSummaryLabel(values.priceRangeIds, priceMeta);
  const colorLabel = buildSummaryLabel(values.colorIds, colorMeta);

  return [
    {
      category: 'furniture',
      id: furnitureLabel ? 'furniture-summary' : 'furniture-placeholder',
      label: furnitureLabel ?? '카테고리',
      applied: furnitureLabel !== null,
    },
    {
      category: 'price',
      id: priceLabel ? 'price-summary' : 'price-placeholder',
      label: priceLabel ?? '가격대',
      applied: priceLabel !== null,
    },
    {
      category: 'color',
      id: colorLabel ? 'color-summary' : 'color-placeholder',
      label: colorLabel ?? '색상',
      applied: colorLabel !== null,
    },
  ];
};

export const useProductTabState = () => {
  const { data: filterData } = useFilterListQuery();
  const furnitureMeta = useMemo<FilterSummaryMeta>(() => {
    const options = filterData?.furnitureTypes ?? [];
    const labels = Object.fromEntries(
      options
        .filter((item) => item.id != null && !!item.nameKr)
        .map((item) => [String(item.id), item.nameKr as string])
    );
    const orderedOptionIds = options
      .filter((item) => item.id != null)
      .map((item) => String(item.id));
    const allId = options.find((item) => item.nameKr === '전체')?.id;

    return {
      labels,
      orderedOptionIds,
      allId: allId != null ? String(allId) : undefined,
    };
  }, [filterData?.furnitureTypes]);

  const priceMeta = useMemo<FilterSummaryMeta>(() => {
    const options = filterData?.priceRanges ?? [];
    const labels = Object.fromEntries(
      options
        .filter((item) => !!item.id && !!item.label)
        .map((item) => [item.id as string, item.label as string])
    );
    const orderedOptionIds = options
      .filter((item) => !!item.id)
      .map((item) => item.id as string);
    const allId = options.find((item) => item.label === '전체')?.id;

    return { labels, orderedOptionIds, allId: allId as string | undefined };
  }, [filterData?.priceRanges]);

  const colorMeta = useMemo<FilterSummaryMeta>(() => {
    const options = filterData?.colors ?? [];
    const labels = Object.fromEntries(
      options
        .filter((item) => item.id != null && !!item.label)
        .map((item) => [String(item.id), item.label as string])
    );
    const orderedOptionIds = options
      .filter((item) => item.id != null)
      .map((item) => String(item.id));
    const allId = options.find((item) => item.label === '전체')?.id;

    return {
      labels,
      orderedOptionIds,
      allId: allId != null ? String(allId) : undefined,
    };
  }, [filterData?.colors]);

  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);
  const [appliedFilterValues, setAppliedFilterValues] =
    useState<ProductFilterValues>(INITIAL_FILTER_VALUES);
  const [appliedFilterChips, setAppliedFilterChips] = useState<
    AppliedFilterChip[]
  >(() =>
    buildAppliedFilterChips(
      INITIAL_FILTER_VALUES,
      furnitureMeta,
      priceMeta,
      colorMeta
    )
  );
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const productFilterSheetRef = useRef<ProductFilterSheetRef>(null);
  const { notify } = useToast();

  const syncFilterSheetValues = useCallback(() => {
    productFilterSheetRef.current?.setValues({
      furnitureTypeIds: [...appliedFilterValues.furnitureTypeIds],
      priceRangeIds: [...appliedFilterValues.priceRangeIds],
      colorIds: [...appliedFilterValues.colorIds],
    });
  }, [appliedFilterValues]);

  // 필터 시트가 다시 열릴 때 마지막 적용값으로 내부 선택 상태 복원
  useLayoutEffect(() => {
    if (!filterSheetOpen) return;
    syncFilterSheetValues();
  }, [filterSheetOpen, syncFilterSheetValues]);

  // handleFilterChipClick: 상단 필터 칩 클릭 시 활성 카테고리 전환 및 필터 시트 열림/닫힘 처리
  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      setChipSelected((prev) => {
        // 이미 선택된 칩을 다시 누르면 시트를 닫고 선택 상태 초기화
        if (prev[category]) {
          queueMicrotask(() => {
            setFilterSheetOpen(false);
          });
          return { ...INITIAL_CHIP_SELECTED };
        }

        queueMicrotask(() => {
          setFilterSheetOpen(true);
          queueMicrotask(() => {
            syncFilterSheetValues();
          });
        });
        // 하나의 카테고리 칩만 활성 상태로 유지
        return {
          furniture: category === 'furniture',
          price: category === 'price',
          color: category === 'color',
        };
      });
    },
    [syncFilterSheetValues]
  );

  // handleFilterSheetClose: 필터 시트를 닫고 칩 활성 상태를 초기화
  const handleFilterSheetClose = useCallback(() => {
    setFilterSheetOpen(false);
    setChipSelected({ ...INITIAL_CHIP_SELECTED });
  }, []);

  // handleFilterApply: 시트의 현재 선택값을 적용값으로 확정하고 상단 요약 칩 갱신
  const handleFilterApply = useCallback(() => {
    const values = productFilterSheetRef.current?.getValues();
    if (values) {
      const nextValues: ProductFilterValues = {
        furnitureTypeIds: [...values.furnitureTypeIds],
        priceRangeIds: [...values.priceRangeIds],
        colorIds: [...values.colorIds],
      };

      console.log('[ProductTab] apply filters:', {
        selectedValues: nextValues,
      });

      setAppliedFilterValues(nextValues);
      setAppliedFilterChips(
        buildAppliedFilterChips(nextValues, furnitureMeta, priceMeta, colorMeta)
      );
    }
    handleFilterSheetClose();
  }, [colorMeta, furnitureMeta, handleFilterSheetClose, priceMeta]);

  // handleRemoveAppliedChip: 상단 적용 칩 제거 시 해당 카테고리를 ALL 상태로 복원
  const handleRemoveAppliedChip = useCallback(
    (category: ProductFilterChipCategory, _id: string) => {
      const normalizedValues: ProductFilterValues = {
        furnitureTypeIds:
          category === 'furniture'
            ? [ALL]
            : [...appliedFilterValues.furnitureTypeIds],
        priceRangeIds:
          category === 'price' ? [ALL] : [...appliedFilterValues.priceRangeIds],
        colorIds:
          category === 'color' ? [ALL] : [...appliedFilterValues.colorIds],
      };

      setAppliedFilterValues(normalizedValues);
      setAppliedFilterChips(
        buildAppliedFilterChips(
          normalizedValues,
          furnitureMeta,
          priceMeta,
          colorMeta
        )
      );
      if (filterSheetOpen) {
        // 시트가 열린 상태에서만 즉시 동기화하고, 닫힌 상태는 오픈 시 effect에 위임
        productFilterSheetRef.current?.setValues(normalizedValues);
      }
    },
    [appliedFilterValues, colorMeta, filterSheetOpen, furnitureMeta, priceMeta]
  );

  useLayoutEffect(() => {
    setAppliedFilterChips(
      buildAppliedFilterChips(
        appliedFilterValues,
        furnitureMeta,
        priceMeta,
        colorMeta
      )
    );
  }, [appliedFilterValues, colorMeta, furnitureMeta, priceMeta]);

  // handleSelectProduct: 상품 선택 추가(중복 방지, 최대 개수 제한, 초과 시 토스트)
  const handleSelectProduct = useCallback(
    (product: SelectedProduct) => {
      let attemptedOverMax = false;
      setSelectedProducts((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        if (prev.length >= MAX_SELECTED_PRODUCTS) {
          attemptedOverMax = true;
          return prev;
        }
        return [...prev, product];
      });
      if (attemptedOverMax) {
        notify({
          text: `상품은 최대 ${MAX_SELECTED_PRODUCTS}개까지만 선택할 수 있어요`,
        });
      }
    },
    [notify]
  );

  // handleRemoveSelectedProduct: 선택된 상품 목록에서 특정 상품 제거
  const handleRemoveSelectedProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  }, []);

  // handleDecorateWithProductsClick: 하단 CTA 클릭 시 최소 선택 개수(1개) 검증
  const handleDecorateWithProductsClick = useCallback(() => {
    if (selectedProducts.length === 0) {
      notify({ text: '상품을 1개 이상 선택해주세요' });
    }
  }, [notify, selectedProducts.length]);

  // 필터 시트 내부 선택값만 초기화(적용값은 유지)
  const handleFilterResetClick = useCallback(() => {
    productFilterSheetRef.current?.reset();
  }, []);

  return {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    selectedProducts,
    productFilterSheetRef,
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
  };
};
