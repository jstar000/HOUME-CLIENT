/**
 * GA screen_name 스택 + `return_screen_name` 파라미터
 *
 * | 모듈 | 역할 |
 * |------|------|
 * | screenNameStack | 라우트 변경 시 previous/current screen_name 갱신 |
 * | returnScreenName | `return_screen_name` 정책별 params 조립 |
 */
export * from './returnScreenName';
export * from './screenNameStack';
