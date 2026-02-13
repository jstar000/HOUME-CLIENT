Generate Vitest unit tests for the specified module.
Target: $ARGUMENTS

## Before writing tests, read these reference files first:

- `src/pages/generate/constants/furnitureCategoryMapping.test.ts` — unit test pattern (Korean descriptions, import style)
- `src/shared/constants/apiEndpoints.test.ts` — type-level test pattern

## Test file location:

Place test file next to source: `{filename}.test.ts` or `{filename}.test.tsx`

## Test structure pattern:

```ts
import { describe, expect, it } from 'vitest';
// For type tests: import { expectTypeOf } from 'vitest';

import { functionToTest } from './moduleUnderTest';

describe('moduleName', () => {
  it('한국어로 테스트 설명 작성', () => {
    const result = functionToTest(input);
    expect(result).toEqual(expected);
  });
});
```

## Key conventions:

- **Test descriptions in Korean** (e.g., `it('finalLabel 기반으로 침대 코드를 반환해요', ...)`)
- **describe block**: module or function name (English)
- **it block**: Korean behavior description ending with ~해요/~예요

## What to test (priority order):

1. Pure utility functions — all input/output combinations
2. Constants — structure validation, no duplicates
3. Type guards — valid and invalid inputs
4. Validation logic — boundary cases, error cases
5. Zustand stores — state transitions, reset behavior

## What NOT to test in unit tests:

- React components (use Storybook stories)
- API calls directly (need mocking)
- React hooks with side effects

## After creating:

Run: `npx vitest run --project unit {testFilePath}`
