// jest-dom의 toBeInTheDocument(), toBeVisible() 등 DOM 전용 매처를 전역 등록
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트 후 DOM을 초기화해서 테스트 간 상태 오염 방지
afterEach(() => {
  cleanup();
});
