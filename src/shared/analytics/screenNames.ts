import { FUNNEL_ID } from '@pages/imageSetup/constants/funnel';

import { ROUTES } from '@routes/paths';

/**
 * screen_name / return_screen_name / previous_screen_name (노션 Page Code 표)
 *
 * | screen_name     | URL (preview.houme.kr 이후)                                      |
 * |-----------------|------------------------------------------------------------------|
 * | landing         | /landing                                                         |
 * | loginSocial     | /login                                                           |
 * | signupForm      | /signup                                                          |
 * | signupComp      | /welcome                                                         |
 * | home            | /                                                                |
 * | bannerDetail    | /banner/:id                                                      |
 * | roomType        | /imageSetup                                                      |
 * | styleList       | /styles                                                          |
 * | styleDetail     | /styles/:id                                                      |
 * | shop            | /?tab=product                                                    |
 * | selectMoodboard | /imageSetup?image-generation-funnel.step=InteriorStyle           |
 * | selectFurniture | /imageSetup?image-generation-funnel.step=ActivityInfo            |
 * | loadImg         | /generate                                                        |
 * | resultRec       | /generate/result?houseId=id&viewType=FULL_FUNNEL                 |
 * | resultList      | /generate/result?houseId=id&viewType=PRODUCT                     |
 * | mypage          | /mypage                                                          |
 * | setting         | /mypage/setting                                                  |
 * | privacyPolicy   | /mypage/setting/privacy                                          |
 * | serviceTerm     | /mypage/setting/service                                          |
 * | editProfile     | /mypage/setting/profileEdit                                      |
 */
export const SCREEN_NAME = {
  LANDING: 'landing',
  LOGIN_SOCIAL: 'loginSocial',
  SIGNUP_FORM: 'signupForm',
  SIGNUP_COMP: 'signupComp',
  HOME: 'home',
  BANNER_DETAIL: 'bannerDetail',
  ROOM_TYPE: 'roomType',
  STYLE_LIST: 'styleList',
  STYLE_DETAIL: 'styleDetail',
  SHOP: 'shop',
  SELECT_MOODBOARD: 'selectMoodboard',
  SELECT_FURNITURE: 'selectFurniture',
  LOAD_IMG: 'loadImg',
  RESULT_REC: 'resultRec',
  RESULT_LIST: 'resultList',
  MYPAGE: 'mypage',
  SETTING: 'setting',
  PRIVACY_POLICY: 'privacyPolicy',
  SERVICE_TERM: 'serviceTerm',
  EDIT_PROFILE: 'editProfile',
} as const;

export type ScreenName = (typeof SCREEN_NAME)[keyof typeof SCREEN_NAME];

const FUNNEL_STEP_PARAM = `${FUNNEL_ID}.step`;

const parsePathWithSearch = (pathWithSearch: string) => {
  const [pathname = ROUTES.HOME, search = ''] = pathWithSearch.split('?');
  const searchParams = new URLSearchParams(search);

  return {
    pathname: pathname || ROUTES.HOME,
    searchParams,
  };
};

/**
 * 경로(+쿼리) → 노션 screen_name
 *
 * `loginRedirect` 등 pathname+search 형태(`/?tab=product`)를 그대로 넘기면 됩니다.
 */
export const resolveScreenName = (
  pathWithSearch: string
): ScreenName | string => {
  const { pathname, searchParams } = parsePathWithSearch(pathWithSearch);

  if (pathname === ROUTES.HOME && searchParams.get('tab') === 'product') {
    return SCREEN_NAME.SHOP;
  }

  if (pathname === ROUTES.IMAGE_SETUP) {
    const step = searchParams.get(FUNNEL_STEP_PARAM);

    if (step === 'InteriorStyle') {
      return SCREEN_NAME.SELECT_MOODBOARD;
    }

    if (step === 'ActivityInfo') {
      return SCREEN_NAME.SELECT_FURNITURE;
    }

    return SCREEN_NAME.ROOM_TYPE;
  }

  if (pathname === ROUTES.GENERATE_RESULT) {
    const viewType = searchParams.get('viewType');

    if (viewType === 'PRODUCT') {
      return SCREEN_NAME.RESULT_LIST;
    }

    return SCREEN_NAME.RESULT_REC;
  }

  if (pathname === ROUTES.GENERATE) return SCREEN_NAME.LOAD_IMG;
  if (pathname === ROUTES.LANDING) return SCREEN_NAME.LANDING;
  if (pathname === ROUTES.LOGIN) return SCREEN_NAME.LOGIN_SOCIAL;
  if (pathname === ROUTES.SIGNUP) return SCREEN_NAME.SIGNUP_FORM;
  if (pathname === ROUTES.WELCOME) return SCREEN_NAME.SIGNUP_COMP;
  if (pathname === ROUTES.HOME) return SCREEN_NAME.HOME;
  if (pathname.startsWith('/banner/')) return SCREEN_NAME.BANNER_DETAIL;
  if (pathname === ROUTES.STYLE_LIST) return SCREEN_NAME.STYLE_LIST;
  if (pathname.startsWith('/styles/')) return SCREEN_NAME.STYLE_DETAIL;
  if (pathname === ROUTES.SETTING_PROFILE_EDIT) return SCREEN_NAME.EDIT_PROFILE;
  if (pathname === ROUTES.SETTING_PRIVACY) return SCREEN_NAME.PRIVACY_POLICY;
  if (pathname === ROUTES.SETTING_SERVICE) return SCREEN_NAME.SERVICE_TERM;
  if (pathname === ROUTES.SETTING) return SCREEN_NAME.SETTING;
  if (pathname.startsWith(ROUTES.MYPAGE)) return SCREEN_NAME.MYPAGE;

  return pathname;
};
