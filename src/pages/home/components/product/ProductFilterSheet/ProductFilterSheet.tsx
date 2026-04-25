import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { useFilterListQuery } from '@pages/home/apis/queries/useFilterListQuery';

import Chip from '@components/v2/chip/Chip';

import * as styles from './ProductFilterSheet.css';

type FilterOption = { id: string; label: string };
type ColorFilterOption = FilterOption & { value?: string };

const INITIAL_SELECTION: string[] = [];

// 섹션 내 다중 선택 - allId만 있으면 ‘전체’, 그 외는 선택된 id 목록
function toggleSectionSelection(
  current: string[],
  id: string,
  allId?: string
): string[] {
  if (!allId) {
    const has = current.includes(id);
    return has ? current.filter((x) => x !== id) : [...current, id];
  }

  if (id === allId) {
    return [allId];
  }

  const withoutAll = current.filter((x) => x !== allId);
  const has = withoutAll.includes(id);
  const next = has ? withoutAll.filter((x) => x !== id) : [...withoutAll, id];
  return next.length === 0 ? [allId] : next;
}

function getAllOptionId<T extends FilterOption>(
  options: T[]
): string | undefined {
  return options.find((option) => option.label === '전체')?.id;
}

export interface ProductFilterValues {
  furnitureTypeIds: string[];
  priceRangeIds: string[];
  colorIds: string[];
}

export interface ProductFilterSheetRef {
  reset: () => void;
  getValues: () => ProductFilterValues;
  setValues: (values: ProductFilterValues) => void;
}

const ProductFilterSheet = forwardRef<ProductFilterSheetRef>(
  function ProductFilterSheet(_props, ref) {
    const { data } = useFilterListQuery();
    const [furnitureTypeIds, setFurnitureTypeIds] =
      useState<string[]>(INITIAL_SELECTION);
    const [priceRangeIds, setPriceRangeIds] =
      useState<string[]>(INITIAL_SELECTION);
    const [colorIds, setColorIds] = useState<string[]>(INITIAL_SELECTION);

    const furnitureOptions = useMemo<FilterOption[]>(
      () =>
        (data?.furnitureTypes ?? [])
          .filter((type) => type.id != null && !!type.nameKr)
          .map((type) => ({
            id: String(type.id),
            label: type.nameKr as string,
          })),
      [data?.furnitureTypes]
    );

    const priceOptions = useMemo<FilterOption[]>(
      () =>
        (data?.priceRanges ?? [])
          .filter((range) => !!range.id && !!range.label)
          .map((range) => ({
            id: range.id as string,
            label: range.label as string,
          })),
      [data?.priceRanges]
    );

    const colorOptions = useMemo<ColorFilterOption[]>(
      () =>
        (data?.colors ?? [])
          .filter((color) => color.id != null && !!color.label)
          .map((color) => ({
            id: String(color.id),
            label: color.label as string,
            value: color.value ?? undefined,
          })),
      [data?.colors]
    );

    const furnitureAllId = useMemo(
      () => getAllOptionId(furnitureOptions),
      [furnitureOptions]
    );
    const priceAllId = useMemo(
      () => getAllOptionId(priceOptions),
      [priceOptions]
    );
    const colorAllId = useMemo(
      () => getAllOptionId(colorOptions),
      [colorOptions]
    );

    useEffect(() => {
      console.log(
        '[ProductFilterSheet] GET /api/v1/curations/products/filters',
        {
          raw: data,
          furnitureOptions,
          priceOptions,
          colorOptions,
        }
      );
    }, [colorOptions, data, furnitureOptions, priceOptions]);

    useEffect(() => {
      if (!furnitureAllId) return;
      setFurnitureTypeIds((prev) =>
        prev.length > 0 ? prev : [furnitureAllId]
      );
    }, [furnitureAllId]);

    useEffect(() => {
      if (!priceAllId) return;
      setPriceRangeIds((prev) => (prev.length > 0 ? prev : [priceAllId]));
    }, [priceAllId]);

    useEffect(() => {
      if (!colorAllId) return;
      setColorIds((prev) => (prev.length > 0 ? prev : [colorAllId]));
    }, [colorAllId]);

    const reset = useCallback(() => {
      setFurnitureTypeIds(
        furnitureAllId ? [furnitureAllId] : [...INITIAL_SELECTION]
      );
      setPriceRangeIds(priceAllId ? [priceAllId] : [...INITIAL_SELECTION]);
      setColorIds(colorAllId ? [colorAllId] : [...INITIAL_SELECTION]);
    }, [colorAllId, furnitureAllId, priceAllId]);

    const getValues = useCallback((): ProductFilterValues => {
      return {
        furnitureTypeIds: [...furnitureTypeIds],
        priceRangeIds: [...priceRangeIds],
        colorIds: [...colorIds],
      };
    }, [furnitureTypeIds, priceRangeIds, colorIds]);

    const setValues = useCallback(
      (values: ProductFilterValues) => {
        setFurnitureTypeIds(
          values.furnitureTypeIds.length > 0
            ? [...values.furnitureTypeIds]
            : furnitureAllId
              ? [furnitureAllId]
              : [...INITIAL_SELECTION]
        );
        setPriceRangeIds(
          values.priceRangeIds.length > 0
            ? [...values.priceRangeIds]
            : priceAllId
              ? [priceAllId]
              : [...INITIAL_SELECTION]
        );
        setColorIds(
          values.colorIds.length > 0
            ? [...values.colorIds]
            : colorAllId
              ? [colorAllId]
              : [...INITIAL_SELECTION]
        );
      },
      [colorAllId, furnitureAllId, priceAllId]
    );

    useImperativeHandle(
      ref,
      () => ({
        reset,
        getValues,
        setValues,
      }),
      [reset, getValues, setValues]
    );

    const handleFurnitureChipClick = useCallback(
      (id: string) => {
        setFurnitureTypeIds((prev) =>
          toggleSectionSelection(prev, id, furnitureAllId)
        );
      },
      [furnitureAllId]
    );

    const handlePriceChipClick = useCallback(
      (id: string) => {
        setPriceRangeIds((prev) =>
          toggleSectionSelection(prev, id, priceAllId)
        );
      },
      [priceAllId]
    );

    const handleColorChipClick = useCallback(
      (id: string) => {
        setColorIds((prev) => toggleSectionSelection(prev, id, colorAllId));
      },
      [colorAllId]
    );

    return (
      <div className={styles.root}>
        <section
          className={styles.section}
          aria-labelledby="filter-furniture-heading"
        >
          <h2 id="filter-furniture-heading" className={styles.sectionTitle}>
            카테고리
          </h2>
          <div className={styles.chipGroup} role="group" aria-label="카테고리">
            {furnitureOptions.map(({ id, label }, index) => (
              <Chip
                key={`furniture-${id}-${label}-${index}`}
                selected={furnitureTypeIds.includes(id)}
                onClick={() => handleFurnitureChipClick(id)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="filter-price-heading"
        >
          <h2 id="filter-price-heading" className={styles.sectionTitle}>
            가격대
          </h2>
          <div className={styles.chipGroup} role="group" aria-label="가격대">
            {priceOptions.map(({ id, label }, index) => (
              <Chip
                key={`price-${id}-${label}-${index}`}
                selected={priceRangeIds.includes(id)}
                onClick={() => handlePriceChipClick(id)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="filter-color-heading"
        >
          <h2 id="filter-color-heading" className={styles.sectionTitle}>
            색상
          </h2>
          <div className={styles.chipGroup} role="group" aria-label="색상">
            {colorOptions.map(({ id, label, value }, index) => (
              <Chip
                key={`color-${id}-${label}-${index}`}
                selected={colorIds.includes(id)}
                onClick={() => handleColorChipClick(id)}
              >
                {value ? (
                  <span className={styles.colorChipInner}>
                    <span
                      className={styles.colorDot}
                      style={{
                        backgroundColor: value,
                      }}
                    />
                    {label}
                  </span>
                ) : (
                  label
                )}
              </Chip>
            ))}
          </div>
        </section>
      </div>
    );
  }
);

ProductFilterSheet.displayName = 'ProductFilterSheet';

export default ProductFilterSheet;
