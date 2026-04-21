import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import CloseBottomSheet from '@shared/components/v2/bottomSheet/CloseBottomSheet';
import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import { useToast } from '@components/toast/useToast';

import IntroSection from './IntroSection/IntroSection';
import ProductFilterSheet, {
  type ProductFilterValues,
  type ProductFilterSheetRef,
} from './ProductFilterSheet/ProductFilterSheet';
import * as styles from './ProductTab.css';
import SearchSection, {
  type AppliedFilterChip,
  type ProductFilterChipCategory,
  type SelectedProduct,
} from './SearchSection/SearchSection';
import SelectedProductSheet from './SelectedProductSheet/SelectedProductSheet';

const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

const ALL = 'ALL';

/** ProductFilterSheet 옵션 나열 순서와 동일 (요약 라벨의 대표값 기준) */
const FURNITURE_OPTION_ORDER: string[] = [
  ALL,
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
];

const PRICE_OPTION_ORDER: string[] = [
  ALL,
  'P1',
  'P2',
  'P3',
  'P4',
  'P5',
  'P6',
  'P7',
];

const COLOR_OPTION_ORDER: string[] = [
  ALL,
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
];

const FURNITURE_LABELS: Record<string, string> = {
  '1': '침대/프레임',
  '2': '업무용 책상',
  '3': '식탁',
  '4': '좌식 테이블',
  '5': '옷장',
  '6': '수납/장식장',
  '7': '소파',
  '8': '의자/스툴',
  '9': '화장대/협탁',
  '10': '조명',
  '11': '그 외',
};

const PRICE_LABELS: Record<string, string> = {
  P1: '5만원 이하',
  P2: '5-10만원',
  P3: '10만원대',
  P4: '20만원대',
  P5: '30만원대',
  P6: '40만원대',
  P7: '50만원 이상',
};

const COLOR_LABELS: Record<string, string> = {
  '1': '블랙',
  '2': '화이트',
  '3': '그레이',
  '4': '베이지',
  '5': '실버',
  '6': '골드',
  '7': '브라운',
  '8': '레드',
  '9': '오렌지',
  '10': '옐로우',
  '11': '그린',
  '12': '블루',
  '13': '네이비',
  '14': '바이올렛',
  '15': '핑크',
};

const INITIAL_FILTER_VALUES: ProductFilterValues = {
  furnitureTypeIds: [ALL],
  priceRangeIds: [ALL],
  colorIds: [ALL],
};
const MAX_SELECTED_PRODUCTS = 6;

const buildSummaryLabel = (
  ids: string[],
  labels: Record<string, string>,
  orderedOptionIds: string[]
): string | null => {
  const selected = ids.filter((id) => id !== ALL);
  if (selected.length === 0) return null;

  const selectedSet = new Set(selected);
  let firstId: string | undefined;
  for (const id of orderedOptionIds) {
    if (id !== ALL && selectedSet.has(id)) {
      firstId = id;
      break;
    }
  }
  if (firstId === undefined) {
    firstId = selected[0];
  }

  const first = labels[firstId] ?? firstId;
  return selected.length === 1 ? first : `${first} 외 ${selected.length - 1}개`;
};

const buildAppliedFilterChips = (
  values: ProductFilterValues
): AppliedFilterChip[] => {
  const furnitureLabel = buildSummaryLabel(
    values.furnitureTypeIds,
    FURNITURE_LABELS,
    FURNITURE_OPTION_ORDER
  );
  const priceLabel = buildSummaryLabel(
    values.priceRangeIds,
    PRICE_LABELS,
    PRICE_OPTION_ORDER
  );
  const colorLabel = buildSummaryLabel(
    values.colorIds,
    COLOR_LABELS,
    COLOR_OPTION_ORDER
  );

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

const ProductTab = () => {
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);
  const [appliedFilterValues, setAppliedFilterValues] =
    useState<ProductFilterValues>(INITIAL_FILTER_VALUES);
  const [appliedFilterChips, setAppliedFilterChips] = useState<
    AppliedFilterChip[]
  >(() => buildAppliedFilterChips(INITIAL_FILTER_VALUES));
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const productFilterSheetRef = useRef<ProductFilterSheetRef>(null);
  const { notify } = useToast();

  /** 바텀시트가 닫힐 때 필터 시트가 언마운트되므로, 열릴 때마다 마지막 적용값으로 복원 */
  useLayoutEffect(() => {
    if (!filterSheetOpen) return;
    productFilterSheetRef.current?.setValues({
      furnitureTypeIds: [...appliedFilterValues.furnitureTypeIds],
      priceRangeIds: [...appliedFilterValues.priceRangeIds],
      colorIds: [...appliedFilterValues.colorIds],
    });
  }, [filterSheetOpen, appliedFilterValues]);

  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      setChipSelected((prev) => {
        if (prev[category]) {
          queueMicrotask(() => {
            setFilterSheetOpen(false);
          });
          return { ...INITIAL_CHIP_SELECTED };
        }

        queueMicrotask(() => {
          setFilterSheetOpen(true);
        });
        return {
          furniture: category === 'furniture',
          price: category === 'price',
          color: category === 'color',
        };
      });
    },
    []
  );

  const handleFilterSheetClose = useCallback(() => {
    setFilterSheetOpen(false);
    setChipSelected({ ...INITIAL_CHIP_SELECTED });
  }, []);

  const handleFilterApply = useCallback(() => {
    const values = productFilterSheetRef.current?.getValues();
    if (values) {
      const nextValues: ProductFilterValues = {
        furnitureTypeIds: [...values.furnitureTypeIds],
        priceRangeIds: [...values.priceRangeIds],
        colorIds: [...values.colorIds],
      };

      setAppliedFilterValues(nextValues);
      setAppliedFilterChips(buildAppliedFilterChips(nextValues));
    }
    handleFilterSheetClose();
  }, [handleFilterSheetClose]);

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
      setAppliedFilterChips(buildAppliedFilterChips(normalizedValues));
      productFilterSheetRef.current?.setValues(normalizedValues);
    },
    [appliedFilterValues]
  );

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

  const handleRemoveSelectedProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  }, []);

  const handleDecorateWithProductsClick = useCallback(() => {
    if (selectedProducts.length === 0) {
      notify({ text: '상품을 1개 이상 선택해주세요' });
      return;
    }
  }, [notify, selectedProducts.length]);

  const handleFilterResetClick = useCallback(() => {
    productFilterSheetRef.current?.reset();
  }, []);

  return (
    <div className={styles.container}>
      <IntroSection />
      <SearchSection
        chipSelected={chipSelected}
        onFilterChipClick={handleFilterChipClick}
        appliedFilterChips={appliedFilterChips}
        onAppliedFilterChipRemove={handleRemoveAppliedChip}
        selectedProductIds={selectedProducts.map((product) => product.id)}
        onSelectProduct={handleSelectProduct}
      />

      <DragHandleBottomSheet
        open={!filterSheetOpen}
        collapsedHeight="24rem"
        onExpandedChange={setSheetExpanded}
        contentSlot={
          <SelectedProductSheet
            expanded={sheetExpanded}
            selectedProducts={selectedProducts}
            onRemoveProduct={handleRemoveSelectedProduct}
            maxCount={MAX_SELECTED_PRODUCTS}
          />
        }
        primaryButton={
          <ActionButton
            size="2XL"
            fullWidth
            leftIcon="DoubleStar"
            visualDisabled={selectedProducts.length === 0}
            onClick={handleDecorateWithProductsClick}
          >
            이 상품들로 우리 집 꾸미기
          </ActionButton>
        }
      />

      <CloseBottomSheet
        open={filterSheetOpen}
        onClose={handleFilterSheetClose}
        titleAlign="left"
        titleSlot={<p className={styles.filterSheetTitle}>필터</p>}
        contentSlot={<ProductFilterSheet ref={productFilterSheetRef} />}
        secondaryButton={
          <ActionButton
            variant="outlined"
            color="inverse"
            size="2XL"
            leftIcon="Refresh"
            onClick={handleFilterResetClick}
          >
            초기화
          </ActionButton>
        }
        primaryButton={
          <ActionButton size="2XL" fullWidth onClick={handleFilterApply}>
            필터 적용하기
          </ActionButton>
        }
      />
    </div>
  );
};

export default ProductTab;
