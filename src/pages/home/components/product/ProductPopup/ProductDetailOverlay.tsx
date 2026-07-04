import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  trackShopFeedDetailMdCloseClick,
  trackShopFeedDetailMdGoSiteClick,
  trackShopFeedDetailMdSaveClick,
  trackShopFeedDetailMdSelectClick,
  trackShopFeedDetailMdUnsaveClick,
  trackShopFeedDetailMdView,
  type ShopListContext,
} from '@pages/home/analytics/shopAnalytics';
import { useProductDetailQuery } from '@pages/home/apis/queries/useProductDetailQuery';
import { setReopenProduct } from '@pages/home/utils/productDetailOverlayReopen';

import { ROUTES } from '@routes/paths';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import { LOGIN_ENTRY_ROUTE } from '@shared/analytics/params/gate';
import type { ProductColorDetail } from '@shared/apis/__generated__/data-contracts';
import Popup from '@shared/components/v2/popup/Popup';
import type {
  LinkInfo,
  PriceInfo,
  ProductInfo,
  SaveInfo,
} from '@shared/types/productCard';

import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import ProductDetailCard from './ProductDetailCard';

interface ProductDetailOverlayProps {
  unmount: () => void;
  id: number;
  product: ProductInfo;
  price?: PriceInfo;
  save: SaveInfo;
  link?: LinkInfo;
  shoppingAction?: {
    label?: string;
    onClick: () => void;
    disabled?: boolean;
  };
  shopListContext?: ShopListContext;
}

const ProductDetailOverlay = ({
  unmount,
  id,
  product: listProduct,
  price: listPrice,
  save,
  link,
  shoppingAction,
  shopListContext,
}: ProductDetailOverlayProps) => {
  const navigate = useNavigate();
  const { data, isPending } = useProductDetailQuery(id);
  const detail = data?.product;
  const { mutate: toggleJjym } = useJjymMutation({
    loginEntryRoute: LOGIN_ENTRY_ROUTE.PRODUCT_CARD_SAVE,
    onSavedAction: () => {
      navigate(ROUTES.MYPAGE, { state: { activeTab: 'savedItems' } });
    },
  });
  const getSavedState = useSavedItemsStore((s) => s.getSavedState);
  const location = useLocation();
  const openedPathRef = useRef(location.pathname);
  const merged = useMemo(() => {
    const detailColorHexes =
      detail?.colors
        ?.map((colorDetail: ProductColorDetail) => colorDetail.value)
        .filter((colorHex): colorHex is string => Boolean(colorHex)) ?? [];

    const product: ProductInfo = {
      title: detail?.name ?? listProduct.title,
      brand: detail?.brand ?? listProduct.brand,
      imageUrl: detail?.imageUrl ?? listProduct.imageUrl,
      colorHexes:
        detailColorHexes.length > 0 ? detailColorHexes : listProduct.colorHexes,
    };

    const price: PriceInfo | undefined = detail
      ? {
          original: detail.originalPrice ?? listPrice?.original,
          discount: detail.finalPrice ?? listPrice?.discount,
          discountRate: detail.discountRate ?? listPrice?.discountRate,
        }
      : listPrice;

    const linkHrefOverride = detail?.linkUrl ?? link?.href;

    const saveCount =
      detail != null
        ? detail.jjymCount
        : save.count != null && save.count > 0
          ? save.count
          : undefined;

    return { product, price, linkHrefOverride, saveCount };
  }, [detail, link?.href, listPrice, listProduct, save.count]);

  const mergedRef = useRef(merged);
  mergedRef.current = merged;

  const isSaved = getSavedState(id, detail?.isLiked ?? save.isSaved);

  useEffect(() => {
    trackShopFeedDetailMdView();
  }, []);

  const handleSaveToggle = () => {
    if (isSaved) {
      trackShopFeedDetailMdUnsaveClick({
        id,
        title: merged.product.title,
      });
    } else {
      trackShopFeedDetailMdSaveClick({
        id,
        title: merged.product.title,
      });
    }

    toggleJjym(id, { productName: merged.product.title });
  };

  const handleClose = useCallback(() => {
    trackShopFeedDetailMdCloseClick();
    unmount();
  }, [unmount]);

  const handleConfirm = useCallback(() => {
    trackShopFeedDetailMdSelectClick(
      {
        id,
        title: merged.product.title,
        brand: merged.product.brand,
        discountPrice: merged.price?.discount,
      },
      shopListContext
    );
    shoppingAction?.onClick();
    unmount();
  }, [id, merged, shopListContext, shoppingAction, unmount]);

  useEffect(() => {
    if (location.pathname === openedPathRef.current) return;

    if (location.pathname === ROUTES.LOGIN) {
      const { product, price, linkHrefOverride } = mergedRef.current;
      setReopenProduct({ id, product, price, linkHref: linkHrefOverride });
    }
    unmount();
  }, [location.pathname, unmount, id]);

  return (
    <Popup
      btnStyle="solid"
      btnText={shoppingAction?.label ?? '선택'}
      confirmDisabled={shoppingAction?.disabled}
      onClose={handleClose}
      onCancel={handleSaveToggle}
      onConfirm={handleConfirm}
      showCloseButton
      sideIconName={isSaved ? 'HeartFillColor' : 'HeartStrokeGray'}
      content={
        <ProductDetailCard
          product={merged.product}
          price={merged.price}
          saveCount={merged.saveCount}
          link={
            link
              ? {
                  ...link,
                  onClick: () => {
                    trackShopFeedDetailMdGoSiteClick({
                      id,
                      title: merged.product.title,
                      discountPrice: merged.price?.discount,
                    });
                    link.onClick?.();
                  },
                }
              : undefined
          }
          linkHrefOverride={merged.linkHrefOverride}
          isLoading={isPending}
        />
      }
    />
  );
};

export default ProductDetailOverlay;
