/**
 * GA4 Event Code 상수 (Notion v2.0.0)
 *
 * - `done`: B-2 사용 + 윤아 최종 Done → 1차 삽입 대상
 * - `notStarted`: 기획 확정 후 2차 삽입 예정 (미리 정의해 두고 trackEvent 연결만 나중에)
 *
 */

/** 1차 삽입 대상 (Done) */
export const GA_EVENTS_DONE = {
  landing: {
    PAGE_VIEW: 'landing_page_view',
    BTN_CTA_CLICK: 'landing_btnCTA_click',
  },

  topNav: {
    CREATE_IMG_CLICK: 'topNavCreateImg_click',
    LOGIN_CLICK: 'topNavLogin_click',
    MYPAGE_CLICK: 'topNavMypage_click',
    LOGO_CLICK: 'topNavLogo_click',
  },

  home: {
    PAGE_VIEW: 'home_page_view',
    PAGE_SCROLL: 'home_page_scroll',
    TAP_EXPLORE_CLICK: 'home_tapExplore_click',
    TAP_SHOP_CLICK: 'home_tapShop_click',
    BANNER_BG_IMG_CLICK: 'home_bannerBgImg_click',
    BANNER_LEFT_SWIPE: 'home_bannerLeft_swipe',
    BANNER_RIGHT_SWIPE: 'home_bannerRight_swipe',
    SPACE_MORE_CLICK: 'home_spaceMore_click',
    SPACE_CARD_CLICK: 'home_spaceCard_click',
    SPACE_CARD_SLIDE_SCROLL: 'home_spaceCardSlide_scroll',
    SPACE_MORE_CARD_SCROLL: 'home_spaceMoreCard_scroll',
    STYLE_MORE_CLICK: 'home_styleMore_click',
    STYLE_CARD_LIST_SCROLL: 'home_styleCardList_scroll',
    STYLE_CARD_CLICK: 'home_styleCard_click',
  },

  shop: {
    PAGE_VIEW: 'shop_page_view',
    PAGE_SCROLL: 'shop_page_scroll',
    BANNER_VIEW: 'shop_banner_view',
    BANNER_CLICK: 'shop_banner_click',
    SEARCH_BAR_CLICK: 'shop_searchBar_click',
    SEARCH_SUBMIT: 'shop_search_submit',
    SEARCH_CLEAR: 'shop_search_clear',
    FILTER_LIST_CLICK: 'shop_filterList_click',
    FILTER_SHEET_VIEW: 'shop_filterSheet_view',
    FILTER_SHEET_SUBMIT: 'shop_filterSheet_submit',
    FILTER_SHEET_RESET_CLICK: 'shop_filterSheetReset_click',
    LIST_PRODUCT_VIEW: 'shop_listProduct_view',
    LIST_PRODUCT_SCROLL: 'shop_listProduct_scroll',
    LIST_EMPTY_VIEW: 'shop_listEmpty_view',
    SELECT_SHEET_VIEW: 'shop_selectSheet_view',
    SELECT_SHEET_SWIPE_UP: 'shop_selectSheet_swipeUp',
    SELECT_SHEET_SWIPE_DOWN: 'shop_selectSheet_swipeDown',
    SELECT_SHEET_ITEM_CLICK: 'shop_selectSheetItem_click',
    SELECT_SHEET_ADD_ITEM_CLICK: 'shop_selectSheetAddItem_click',
    SELECT_SHEET_REMOVE_CLICK: 'shop_selectSheetRemove_click',
    SELECT_SHEET_CTA_CLICK: 'shop_selectSheetCTA_click',
    SELECT_SHEET_DISABLED_CTA_CLICK: 'shop_selectSheetdisabledCTA_click',
    SELECT_SHEET_ITEM_COUNT_CHANGE: 'shop_selectSheetItemCount_change',
  },

  bannerDetail: {
    PAGE_VIEW: 'bannerDetail_page_view',
    PAGE_SCROLL: 'bannerDetail_page_scroll',
    CHIP_CLICK: 'bannerDetail_chip_click',
    BTN_CTA_CLICK: 'bannerDetail_btnCTA_click',
    BTN_CTA_DISABLED_CLICK: 'bannerDetail_btnCTADisabled_click',
    BTN_BACK_CLICK: 'bannerDetail_btnBack_click',
  },

  styleList: {
    PAGE_VIEW: 'styleList_page_view',
    PAGE_SCROLL: 'styleList_page_scroll',
  },

  styleDetail: {
    PAGE_VIEW: 'styleDetail_page_view',
  },

  loginSocial: {
    PAGE_VIEW: 'loginSocial_page_view',
    BTN_CTA_CLICK: 'loginSocial_btnCTA_click',
    BTN_SERVICE_TERM_CLICK: 'loginSocial_btnserviceTerm_click',
    BTN_PRIVACY_POLICY_CLICK: 'loginSocial_btnprivacyPolicy_click',
    TOAST_LOGIN_ERROR_VIEW: 'loginSocial_toastLoginError_view',
    /** Action 컬럼 없음 — 노션 Event Code 그대로 */
    LOGIN_SUCCESS: 'loginSocial_LoginSuccess',
  },

  signupForm: {
    PAGE_VIEW: 'signupForm_page_view',
    BROWSER_BACK_CLICK: 'signupForm_browserBack_click',
    BROWSER_BACK_SWIPE: 'signupForm_browserBack_swipe',
    INPUT_NICKNAME_FOCUS: 'signupForm_inputNickname_focus',
    BTN_NICK_RANDOM_CLICK: 'signupForm_btnNickRandom_click',
    BTN_NICK_CLEAR_CLICK: 'signupForm_btnNickClear_click',
    ERROR_NICK_SIGN_VIEW: 'signupForm_errorNickSign_view',
    ERROR_NICK_NUM_VIEW: 'signupForm_errorNickNum_view',
    INPUT_BIRTH_FOCUS: 'signupForm_inputBirth_focus',
    ERROR_BIRTH_INCORRECT_VIEW: 'signupForm_errorBirthIncorrect_view',
    ERROR_BIRTH_UNDER14_VIEW: 'signupForm_errorBirthUnder14_view',
    BTN_GENDER_CLICK: 'signupForm_btngender_click',
    /** Action 컬럼 없음 — 노션 Event Code 그대로 */
    BTN_CTA: 'signupForm_btnCTA',
    BTN_CTA_DISABLED: 'signupForm_btnCTADisabled',
    NOT_COMP_MODAL_VIEW: 'signupForm_notCompModal_view',
    NOT_COMP_MODAL_QUIT_CLICK: 'signupForm_notCompModalQuit_click',
    NOT_COMP_MODAL_KEEP_CLICK: 'signupForm_notCompModalKeep_click',
  },

  signupComp: {
    PAGE_VIEW: 'signupComp_page_view',
    /** Action 컬럼 없음 — 노션 Event Code 그대로 */
    BTN_CTA: 'signupComp_btnCTA',
  },

  selectMoodboard: {
    PAGE_VIEW: 'selectMoodboard_page_view',
    PAGE_SCROLL: 'selectMoodboard_page_scroll',
    CARD_CLICK: 'selectMoodboard_card_click',
    BTN_CTA_INACTIVE_CLICK: 'selectMoodboard_btnCTAInactive_click',
    BTN_CTA_CLICK: 'selectMoodboard_btnCTA_click',
  },

  selectFurniture: {
    PAGE_VIEW: 'selectFurniture_page_view',
    PAGE_SCROLL: 'selectFurniture_page_scroll',
    DROP_DOWN_ACTIVITY_CLICK: 'selectFurniture_dropDownActivity_click',
    ACTIVITY_SHEET_VIEW: 'selectFurniture_activitySheet_view',
    ACTIVITY_SHEET_CTA_CLICK: 'selectFurniture_activitySheetCTA_click',
    BTN_FURNITURE_CLICK: 'selectFurniture_btnFurniture_click',
    /** 노션 오타(Funiture) 그대로 */
    BTN_FUNITURE_CLEAR_CLICK: 'selectFurniture_btnFunitureClear_click',
    BTN_CTA_CLICK: 'selectFurniture_btnCTA_click',
    ERROR_TOAST_ESSENTIAL_DESELECT_VIEW:
      'selectFurniture_errorToastEssentialDeselect_view',
  },
} as const;

/** 2차 삽입 예정 (Not started) — 상수만 선언, trackEvent 연결은 이후 */
export const GA_EVENTS_NOT_STARTED = {
  shop: {
    PRODUCT_CARD_SELECT_CLICK: 'shop_productCardSelect_click',
    PRODUCT_CARD_UNSELECT_CLICK: 'shop_productCardUnselect_click',
    PRODUCT_CARD_DETAIL_CLICK: 'shop_productCardDetail_click',
  },

  resultRec: {
    PRODUCT_CARD_VIEW: 'resultRec_productCard_view',
    PRODUCT_CARD_ON_CARD_CLICK: 'resultRec_productCardonCard_click',
    PRODUCT_CARD_GO_SITE_CLICK: 'resultRec_productCardGoSite_click',
    PRODUCT_CARD_SAVE_CLICK: 'resultRec_productCardSave_click',
    PRODUCT_CARD_UNSAVE_CLICK: 'resultRec_productCardUnsave_click',
  },

  productDetailModal: {
    VIEW: 'productDetailModal_view',
    CLOSE_CLICK: 'productDetailModalClose_click',
    SELECT_CLICK: 'productDetailModalSelect_click',
    SAVE_CLICK: 'productDetailModalSave_click',
    UNSAVE_CLICK: 'productDetailModalUnsave_click',
    GO_SITE_CLICK: 'productDetailModalGoSite_click',
  },

  productList: {
    VIEW: 'productList_view',
    CLICK: 'productList_click',
    IMG_CLICK: 'productListImg_click',
    TEXT_CLICK: 'productListText_click',
    GO_SITE_CLICK: 'productListGoSite_click',
    SAVE_CLICK: 'productListSave_click',
    UNSAVE_CLICK: 'productListUnsave_click',
  },
} as const;

/** Done + Not started 통합 (타입·검색용) */
export const GA_EVENTS = {
  ...GA_EVENTS_DONE,
  notStarted: GA_EVENTS_NOT_STARTED,
} as const;

type EventValue<T> =
  T extends Record<string, infer V>
    ? V extends string
      ? V
      : EventValue<V>
    : never;

/** 모든 Event Code 문자열 유니온 */
export type GaEventName =
  | EventValue<typeof GA_EVENTS_DONE>
  | EventValue<typeof GA_EVENTS_NOT_STARTED>;
