# HOUME-CLIENT 컨벤션 가이드

> 리팩토링 과정에서 확정된 컨벤션을 기록합니다.
> 각 Phase 완료 시 해당 섹션이 추가/업데이트됩니다.
> 리팩토링 완료 후 CLAUDE.md 및 팀 온보딩 문서에 반영 예정입니다.
>
> **마지막 업데이트**: 2026-02-16 (Phase 2 완료)

---

## Query Key 컨벤션 (Phase 1)

### 규칙

1. **모든 쿼리 키는 `queryKeys` factory를 통해 생성한다**
   - 파일: `src/shared/constants/queryKey.ts`
   - 하드코딩 문자열 배열 (`['mypage-user']`) 사용 금지

2. **도메인별 계층 구조를 따른다**

   ```typescript
   queryKeys.{domain}.{key}(params?)
   // e.g., queryKeys.mypage.imageDetail(houseId)
   ```

3. **각 도메인은 `.all` 키를 가진다** — 도메인 전체 invalidation용

   ```typescript
   queryKeys.mypage.all; // ['mypage']
   ```

4. **동적 파라미터는 factory 함수의 인자로 전달한다**

   ```typescript
   // ✅ Good
   queryKeys.generate.result(houseId)[
     // ❌ Bad
     ('generate', 'result', houseId)
   ];
   ```

5. **factory 변수명은 용도를 명시한다**

   ```typescript
   // ✅ Good
   const categoryQueryVars: CategoriesQueryVariables = { ... };
   const productQueryVars: ProductsQueryVariables = { ... };

   // ❌ Bad
   const vars = { ... };
   ```

### 현재 도메인 목록

| 도메인       | 키                                                                                                  | 파라미터                                         |
| ------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `landing`    | `history()`                                                                                         | -                                                |
| `imageSetup` | `housingOptions()`, `floorPlan()`, `activityOptions()`, `moodBoard(limit?)`                         | limit: number                                    |
| `generate`   | `stack(page)`, `result(houseId)`, `fallback(houseId)`, `factors(isLike)`, `image()`                 | page, houseId: number, isLike: boolean           |
| `furniture`  | `dashboard()`, `categoriesGroup(vars)`, `categories(vars)`, `productsGroup(vars)`, `products(vars)` | CategoriesQueryVariables, ProductsQueryVariables |
| `mypage`     | `user()`, `images()`, `imageDetail(houseId)`                                                        | houseId: number                                  |
| `jjym`       | `list()`                                                                                            | -                                                |

### ESLint 관련

- `@tanstack/query/exhaustive-deps`: factory 패턴 사용 시 false positive 발생 가능
  - factory 결과를 queryKey에 넣는 경우 `eslint-disable-next-line` + 사유 주석으로 처리
  - 예: `// eslint-disable-next-line @tanstack/query/exhaustive-deps -- imageId는 productsQueryKey(factory) 내부에 포함됨`

- `@typescript-eslint/no-unused-vars`: `_` prefix로 의도적 미사용 표시 허용
  - `varsIgnorePattern: '^_'` 설정 적용됨
  - 예: `const { houseType: _, ...rest } = prev;`

---

## Import / Path Alias 컨벤션 (Phase 2)

### 핵심 원칙

**가장 짧은 alias를 사용한다.** 같은 경로에 대해 여러 alias가 존재하면, 가장 짧은 것을 선택한다.

```typescript
// ✅ Good — 가장 짧은 alias
import { colorVars } from '@styles/colors.css';
import Button from '@components/Button/Button';

// ❌ Bad — 불필요하게 긴 경로
import { colorVars } from '@shared/styles/colors.css';
import { colorVars } from '@/shared/styles/colors.css';
```

### 사용 가능한 Alias 목록

| Alias          | 실제 경로                | 용도                          |
| -------------- | ------------------------ | ----------------------------- |
| `@pages/`      | `src/pages/`             | Feature 페이지                |
| `@layout/`     | `src/layout/`            | 레이아웃 컴포넌트             |
| `@routes/`     | `src/routes/`            | 라우팅 설정                   |
| `@store/`      | `src/store/`             | 전역 Zustand 스토어           |
| `@shared/`     | `src/shared/`            | shared 직접 접근 (config 등)  |
| `@apis/`       | `src/shared/apis/`       | HTTP 클라이언트, request 래퍼 |
| `@assets/`     | `src/shared/assets/`     | 이미지, SVG 등                |
| `@components/` | `src/shared/components/` | 공통 UI 컴포넌트              |
| `@constants/`  | `src/shared/constants/`  | 상수, 쿼리 키                 |
| `@hooks/`      | `src/shared/hooks/`      | 공통 훅                       |
| `@styles/`     | `src/shared/styles/`     | 디자인 토큰, 글로벌 스타일    |
| `@utils/`      | `src/shared/utils/`      | 유틸리티 함수                 |

### 금지 패턴

1. **`@/` prefix 사용 금지** — 모든 세부 alias로 대체됨

   ```typescript
   // ❌ Bad
   import { colorVars } from '@/shared/styles/colors.css';
   import Button from '@/pages/generate/...';

   // ✅ Good
   import { colorVars } from '@styles/colors.css';
   import Button from '@pages/generate/...';
   ```

2. **`@types/` alias 사용 불가** — npm `@types` 스코프와 충돌

   ```typescript
   // ❌ Bad — TypeScript가 DefinitelyTyped로 해석
   import type { ToastType } from '@types/toast';

   // ✅ Good
   import type { ToastType } from '@shared/types/toast';
   ```

3. **3단계 이상 상대경로 금지**

   ```typescript
   // ❌ Bad
   import { request } from '../../../shared/apis/request';

   // ✅ Good
   import { request } from '@apis/request';
   ```

4. **Feature 내부에서는 상대경로 허용** (1~2단계)

   ```typescript
   // ✅ OK — 같은 feature 내부
   import { useHouseInfo } from '../hooks/useHouseInfo';
   import { HouseInfo } from './HouseInfo';
   ```

### ESLint 설정

- `import/order` pathGroups에 모든 alias가 `internal` 그룹으로 등록됨
- `eslint --fix`로 import 순서 자동 정렬 가능

---

<!-- Phase 2 완료 -->
<!-- Phase 3 완료 시: 네이밍 컨벤션 추가 -->
<!-- Phase 4 완료 시: 폴더 구조 컨벤션 추가 -->
<!-- Phase 5 완료 시: Export 컨벤션 추가 -->
<!-- Phase 6 완료 시: API/데이터 페칭 컨벤션 추가 -->
<!-- Phase 7 완료 시: Provider 구조 추가 -->
<!-- Phase 8 완료 시: Lazy Loading 컨벤션 추가 -->
<!-- Phase 9 완료 시: 에러/로딩 처리 컨벤션 추가 -->
<!-- Phase 10 완료 시: 스타일링 컨벤션 추가 -->

---

## 변경 이력

| 날짜       | 변경 내용                                                                            |
| ---------- | ------------------------------------------------------------------------------------ |
| 2026-02-16 | 템플릿 생성                                                                          |
| 2026-02-16 | Phase 1: Query Key 컨벤션 추가 (factory 패턴, ESLint 설정)                           |
| 2026-02-16 | Phase 2: Path Alias 컨벤션 추가 (@/ 제거, 세부 alias 통일, @store 추가, @types 금지) |
