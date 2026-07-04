/**
 * GA image_entry_route 유틸
 *
 * | 모듈 | 역할 |
 * |------|------|
 * | mapEntryRoute | ENTRY_ROUTE → IMAGE_ENTRY_ROUTE 매핑 SSOT |
 * | getEntryRoute | useImageFlowStore.entryRoute → IMAGE_ENTRY_ROUTE 조회 |
 *
 * login_entry_route와 달리 별도 sessionStorage를 두지 않음
 * → useImageFlowStore가 이미 entryRoute를 persist/reset하므로 그대로 소스로 사용
 *
 * @example
 * import {
 *   getEntryRoute,
 *   mapEntryRouteToImageEntry,
 * } from '@shared/analytics/utils/imageEntryRoute';
 */
export * from '@shared/analytics/utils/imageEntryRoute/getEntryRoute';
export * from '@shared/analytics/utils/imageEntryRoute/mapEntryRoute';
