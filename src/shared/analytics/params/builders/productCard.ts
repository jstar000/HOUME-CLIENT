import type {
  SaveStatus,
  TriggerContext,
} from '@shared/analytics/params/product';
import type { ProductCardParams } from '@shared/analytics/params/productCard';

/** getProductCardParams 입력 — API/카드 뷰모델 공통 최소 필드 */
export type ProductCardInput = {
  id?: number;
  productId?: number;
  name?: string;
  title?: string;
  brand?: string;
  originalPrice?: number;
  finalPrice?: number;
  discountPrice?: number;
  categoryName?: string;
  product_category?: string;
  product_sub_category?: string;
  subCategory?: string;
  isSaved?: boolean;
  isLiked?: boolean;
  trigger_context?: TriggerContext;
  save_status?: SaveStatus;
};

/**
 * 상품 카드 클릭/노출 이벤트 공통 파라미터
 * undefined 필드는 track.ts 병합 시 자연히 제외됨
 */
export const getProductCardParams = (
  product: ProductCardInput
): ProductCardParams => {
  const productId = product.id ?? product.productId;
  const productName = product.name ?? product.title;
  const productPrice =
    product.finalPrice ?? product.discountPrice ?? product.originalPrice;

  const saveStatus =
    product.save_status ??
    (product.isSaved !== undefined
      ? product.isSaved
      : product.isLiked !== undefined
        ? product.isLiked
        : undefined);

  return {
    trigger_context: product.trigger_context,
    product_id: productId,
    product_name: productName,
    product_brand: product.brand,
    product_price: productPrice,
    product_category: product.categoryName ?? product.product_category,
    product_sub_category: product.subCategory ?? product.product_sub_category,
    save_status: saveStatus,
  };
};
