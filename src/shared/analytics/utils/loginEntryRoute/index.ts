/**
 * GA login_entry_route 유틸
 *
 * | 모듈 | 역할 |
 * |------|------|
 * | storage | sessionStorage persist / get / clear |
 * | mapEntryRoute | ENTRY_ROUTE → GA 매핑 및 저장 |
 * | loginSocialParams | loginSocial 이벤트 파라미터 조립 |
 *
 * 앱 복귀 URL(`@utils/loginRedirect`)과는 분리 — OAuth 완료 시 각각 호출
 *
 * @example
 * import {
 *   persistLoginEntryRoute,
 *   persistImageFlowLoginEntry,
 *   clearLoginEntryRoute,
 *   getLoginSocialParams,
 * } from '@shared/analytics/utils/loginEntryRoute';
 */
export * from '@shared/analytics/utils/loginEntryRoute/loginSocialParams';
export * from '@shared/analytics/utils/loginEntryRoute/mapEntryRoute';
export * from '@shared/analytics/utils/loginEntryRoute/storage';
