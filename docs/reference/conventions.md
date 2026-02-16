# HOUME-CLIENT 컨벤션 가이드

> 리팩토링 과정에서 확정된 컨벤션을 기록합니다.
> 각 Phase 완료 시 해당 섹션이 추가/업데이트됩니다.
> 리팩토링 완료 후 CLAUDE.md 및 팀 온보딩 문서에 반영 예정입니다.
>
> **마지막 업데이트**: 2026-02-16 (Phase 1 완료)

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

<!-- Phase 2 완료 시: Import/Path Alias 컨벤션 추가 -->
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

| 날짜       | 변경 내용                                                  |
| ---------- | ---------------------------------------------------------- |
| 2026-02-16 | 템플릿 생성                                                |
| 2026-02-16 | Phase 1: Query Key 컨벤션 추가 (factory 패턴, ESLint 설정) |
