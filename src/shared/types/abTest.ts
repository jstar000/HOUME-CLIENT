export type ABTestGroup = 'A' | 'B';

/** @deprecated GA 이벤트용. generate/utils/analytics에서 사용, GA 브랜치에서 정리 예정 */
export type ImageGenerationVariant = 'single' | 'multiple';

export const AB_TEST_STORAGE_KEY = 'ab_test_variant';

export const DEFAULT_AB_VARIANT: ABTestGroup = 'B';
