/**
 * GA login_entry_route 유틸
 *
 * | 모듈 | 역할 |
 * |------|------|
 * | storage | sessionStorage persist / get / clear |
 * | mapEntryRoute | ENTRY_ROUTE → GA 매핑 및 저장 |
 * | loginSocialParams | loginSocial 이벤트 파라미터 조립 |
 * | finalizeRedirect | OAuth 후 복귀 URL + GA 키 정리 |
 *
 * @example
 * import {
 *   persistLoginEntryRoute,
 *   persistImageFlowLoginEntry,
 *   finalizeLoginRedirect,
 *   getLoginSocialParams,
 * } from '@shared/analytics/utils/loginEntryRoute';
 */
export * from '@shared/analytics/utils/loginEntryRoute/finalizeRedirect';
export * from '@shared/analytics/utils/loginEntryRoute/loginSocialParams';
export * from '@shared/analytics/utils/loginEntryRoute/mapEntryRoute';
export * from '@shared/analytics/utils/loginEntryRoute/storage';
