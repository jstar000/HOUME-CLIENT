# HOUME-CLIENT 컨벤션 가이드

> 리팩토링 과정에서 확정된 컨벤션을 기록합니다.
> 각 Phase 완료 시 해당 섹션이 추가/업데이트됩니다.
> 리팩토링 완료 후 CLAUDE.md 및 팀 온보딩 문서에 반영 예정입니다.
>
> **마지막 업데이트**: 2026-02-17 (Phase 6 완료)

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
   import { request } from '@apis/config/request';
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

## 네이밍 컨벤션 (Phase 3)

### 파일/폴더 네이밍

| 대상          | 규칙              | 예시                                      |
| ------------- | ----------------- | ----------------------------------------- |
| 폴더          | camelCase         | `floorPlan/`, `houseInfo/`, `imageSetup/` |
| 컴포넌트 파일 | PascalCase.tsx    | `FloorPlan.tsx`, `CardCuration.tsx`       |
| 스타일 파일   | PascalCase.css.ts | `FloorPlan.css.ts`                        |
| 훅 파일       | use{Subject}.ts   | `useHouseInfo.ts`, `useGenerate.ts`       |
| API 파일      | {도메인}.ts       | `generate.ts`, `furniture.ts`             |
| 타입 파일     | {도메인}.ts       | `generate.ts`, `detection.ts`             |
| 상수 파일     | {도메인}.ts       | `detection.ts`, `response.ts`             |

### 코드 네이밍

| 대상                  | 규칙                            | 예시                                                               |
| --------------------- | ------------------------------- | ------------------------------------------------------------------ |
| 컴포넌트              | PascalCase (파일명과 동일)      | `HomePage`, `FlipButton`, `LargeFilledButton`                      |
| 페이지 컴포넌트       | `{Feature}Page`                 | `HomePage`, `LoginPage`, `ImageSetupPage`                          |
| 커스텀 훅 (상태/로직) | `use{Subject}`                  | `useABTest`, `useFloorPlan`, `useCreditCheck`                      |
| Query 훅              | `use{Subject}Query`             | `useStackDataQuery`, `useFallbackImageQuery`, `useMyPageUserQuery` |
| Mutation 훅           | `use{Subject}Mutation`          | `useGenerateImageMutation`, `useLogoutMutation`                    |
| API 함수              | `{httpMethod}{Subject}`         | `getFloorPlan`, `postHousingSelection`                             |
| 상수                  | UPPER_SNAKE_CASE                | `API_ENDPOINT`, `QUERY_KEY`, `ROUTES`                              |
| 타입/인터페이스       | PascalCase                      | `CarouselItem`, `BaseResponse<T>`                                  |
| Props                 | `{Component}Props`              | `ButtonProps`, `FloorPlanProps`                                    |
| Zustand 스토어        | `use{Domain}Store`              | `useUserStore`, `useGenerateStore`                                 |
| 쿼리키 팩토리         | `queryKeys.{domain}.{action}()` | `queryKeys.generate.result(houseId)`                               |

### Query/Mutation 접미사 규칙

- **`Query` 접미사**: `useQuery`를 래핑하는 훅에만 붙인다
- **`Mutation` 접미사**: `useMutation`을 래핑하는 훅에만 붙인다
- **상태/로직 훅**: `useQuery`/`useMutation`을 사용하지 않으면 접미사 없이 `use{Subject}`

```typescript
// ✅ Good
export const useStackDataQuery = (...) => useQuery({ ... });     // Query 래퍼
export const useGenerateImageMutation = () => useMutation({ ... }); // Mutation 래퍼
export const useABTest = () => { ... };                          // 상태/로직 훅

// ❌ Bad
export const useStackData = (...) => useQuery({ ... });          // Query인데 접미사 없음
export const useGenerateImageApi = () => useMutation({ ... });   // Api 접미사 사용
```

---

<!-- Phase 3 완료 -->

## 폴더 구조 + Cross-Feature Import (Phase 4)

### Cross-Feature Import 규칙

1. **Feature는 다른 Feature를 직접 import할 수 없다**

   ```typescript
   // ❌ Bad — feature → feature
   import { usePostJjymMutation } from '@pages/generate/hooks/useSaveItem';

   // ✅ Good — shared 모듈 사용
   import { useJjymMutation } from '@hooks/useJjymMutation';
   ```

2. **`shared/`는 `pages/`를 import할 수 없다**

   ```typescript
   // ❌ Bad — shared → feature
   import { getActivityOptions } from '@pages/imageSetup/apis/activityInfo';

   // ✅ Good — feature 내부로 이동하거나 shared로 추출
   ```

3. **App-level (`layout/`, `routes/`, `main.tsx`)은 feature import 허용**

   ```typescript
   // ✅ OK — app-level 오케스트레이션
   import { prefetchStaticData } from '@pages/imageSetup/utils/staticDataPrefetch';
   ```

### Detection 모듈 구조

Detection 시스템은 `src/shared/detection/`에 위치한다:

```
shared/detection/
├── constants.ts                    # OBJ365_MODEL_PATH, 임계값
├── furnitureCategoryMapping.ts     # FurnitureCategoryCode, resolver
├── types.ts                        # Detection, ProcessedDetections
├── hooks/                          # useOnnxModel, useFurnitureHotspots 등
├── stores/                         # useDetectionCacheStore
└── utils/                          # 파이프라인, 매퍼, 전처리 유틸
```

```typescript
// Detection import 패턴
import { OBJ365_MODEL_PATH } from '@shared/detection/constants';
import type { Detection } from '@shared/detection/types';
import { useONNXModel } from '@shared/detection/hooks/useOnnxModel';
```

### shared/apis/ 구조

인프라 설정과 공유 API를 분리한다:

```
shared/apis/
├── config/                  # 인프라 설정 (건드릴 일 거의 없음)
│   ├── axiosInstance.ts     # Axios 인스턴스 + 인터셉터
│   ├── globalErrorHandler.ts # QueryCache onError 핸들러
│   ├── queryClient.ts       # QueryClient 생성 + 기본 옵션
│   └── request.ts           # request<T>() 래퍼 + rawResponse 오버로드
└── mutations/
    └── useJjymMutation.ts   # 공유 mutation (bare + hook colocate)
```

```typescript
// 인프라 import — @apis/config/
import { HTTPMethod, request } from '@apis/config/request';
import { queryClient } from '@apis/config/queryClient';

// 공유 mutation import
import { useJjymMutation } from '@apis/mutations/useJjymMutation';
```

### Feature 내부 폴더 구조

| 하위 폴더     | 용도                   | 예시                            |
| ------------- | ---------------------- | ------------------------------- |
| `apis/`       | Feature API 함수       | `generate.ts`, `furniture.ts`   |
| `components/` | Feature UI 컴포넌트    | `ButtonGroup/`, `CardCuration/` |
| `hooks/`      | Feature 훅             | `useGenerate.ts`                |
| `types/`      | Feature 타입 정의      | `generate.ts`, `furniture.ts`   |
| `steps/`      | 퍼널 스텝 (해당 시)    | `houseInfo/`, `floorPlan/`      |
| `stores/`     | Feature Zustand 스토어 | `useCurationStore.ts`           |
| `constants/`  | Feature 상수           | `progressConfig.ts`             |
| `utils/`      | Feature 유틸리티       | `analytics.ts`                  |

<!-- Phase 4 완료 -->

## Export 컨벤션 (Phase 5)

### 핵심 규칙

| 대상                   | Export 방식      | 이유                                     |
| ---------------------- | ---------------- | ---------------------------------------- |
| 컴포넌트 (\*.tsx)      | `default export` | `React.lazy()` 호환, 1파일=1컴포넌트     |
| 훅 (use\*.ts)          | `named export`   | 한 파일에 여러 export 가능, IDE 자동완성 |
| 유틸 (utils/\*.ts)     | `named export`   | 〃                                       |
| 상수 (constants/\*.ts) | `named export`   | 〃                                       |
| 타입 (types/\*.ts)     | `named export`   | 〃                                       |
| 스토어 (stores/\*.ts)  | `named export`   | 〃                                       |

### 컴포넌트 Default Export 패턴 (rafce 스타일)

```typescript
// ✅ Good — rafce 스타일
const DragHandle = () => {
  return <div>...</div>;
};

export default DragHandle;

// ✅ Good — forwardRef도 동일
const AnimatedSection = forwardRef<HTMLDivElement, Props>(
  (props, ref) => { ... }
);

export default AnimatedSection;

// ❌ Bad — named export
export const DragHandle = () => { ... };

// ❌ Bad — mixed export
export const FlipSheet = () => { ... };
export default FlipSheet;
```

### Named Export 패턴

```typescript
// ✅ Good — 훅
export const useToast = () => { ... };
export const useMyPageUserQuery = (...) => useQuery({ ... });

// ✅ Good — 상수
export const API_ENDPOINT = { ... };
export const ROUTES = { ... };

// ✅ Good — 유틸
export const getCanHistoryGoBack = () => { ... };
```

### 금지 패턴

1. **Barrel export (index.ts) 금지**

   ```typescript
   // ❌ Bad — index.ts 재내보내기
   export { Button } from './Button';
   export { Input } from './Input';
   ```

2. **Mixed export 금지** — 한 파일에 named + default 혼용 금지

   ```typescript
   // ❌ Bad
   export const Component = () => { ... };
   export default Component;
   ```

<!-- Phase 5 완료 -->

## API/데이터 페칭 컨벤션 (Phase 6)

### 파일 구조

```
pages/{feature}/apis/
├── queries/
│   └── use{Subject}Query.ts       # bare 함수 + query 훅
├── mutations/
│   └── use{Subject}Mutation.ts    # bare 함수 + mutation 훅
└── {action}.ts                    # 훅 불필요한 단발성 bare 함수
```

- **1파일 = 1 API 작업**: bare API 함수와 React Query 훅을 같은 파일에 colocate
- **파일 네이밍**: 훅 이름으로 (`useXxxQuery.ts`, `useXxxMutation.ts`) — camelCase

### 파일 내부 패턴

```typescript
// queries/useXxxQuery.ts
import { useQuery } from '@tanstack/react-query';
import { HTTPMethod, request } from '@apis/config/request';
import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

// 1. bare API 함수 (named export)
export const getXxx = async (): Promise<XxxResponse> => {
  return request<XxxResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.XXX.YYY,
  });
};

// 2. React Query 훅 (named export)
export const useXxxQuery = () => {
  return useQuery({
    queryKey: queryKeys.xxx.yyy(),
    queryFn: getXxx,
  });
};
```

### `request()` 래퍼 규칙

1. **모든 API 호출은 `request<T>()` 경유** — 직접 `axiosInstance` 사용 금지

   ```typescript
   // ❌ Bad — axiosInstance 직접 사용
   const response = await axiosInstance.get('/api/...');

   // ✅ Good — request() 래퍼 사용
   const data = await request<ResponseType>({
     method: HTTPMethod.GET,
     url: '...',
   });
   ```

2. **헤더 접근 필요 시 `rawResponse: true`**

   ```typescript
   const response = await request<T>({
     method: HTTPMethod.POST,
     url: API_ENDPOINT.USER.SIGN_UP,
     body: data,
     rawResponse: true, // AxiosResponse 전체 반환
   });
   const token = response.headers['access-token'];
   ```

3. **`body` 타입은 `object`** — 인터페이스를 캐스트 없이 직접 전달 가능
4. **모든 bare 함수에 explicit `Promise<T>` 리턴 타입 필수**

### 훅 위치 규칙

| 훅 종류               | 위치                                   | 예시                                   |
| --------------------- | -------------------------------------- | -------------------------------------- |
| API query/mutation 훅 | `apis/queries/` 또는 `apis/mutations/` | `useStackDataQuery`, `useJjymMutation` |
| 순수 상태/UI 훅       | `hooks/` (feature 레벨)                | `useABTest`, `useCurationState`        |

- **`apis/` 아래에 `hooks/` 폴더 금지** — API 폴더에는 queries/mutations만 허용

### shared API 구조

```
shared/apis/
├── config/                  # 인프라 설정
│   ├── axiosInstance.ts     # Axios 인스턴스 + 인터셉터
│   ├── request.ts           # request<T>() 래퍼 + rawResponse 오버로드
│   ├── queryClient.ts       # QueryClient 생성
│   └── globalErrorHandler.ts
└── mutations/
    └── useJjymMutation.ts   # 공유 mutation (bare + hook colocate)
```

<!-- Phase 6 완료 -->
<!-- Phase 7 완료 시: Provider 구조 추가 -->
<!-- Phase 8 완료 시: Lazy Loading 컨벤션 추가 -->
<!-- Phase 9 완료 시: 에러/로딩 처리 컨벤션 추가 -->
<!-- Phase 10 완료 시: 스타일링 컨벤션 추가 -->

---

## 변경 이력

| 날짜       | 변경 내용                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------- |
| 2026-02-16 | 템플릿 생성                                                                                        |
| 2026-02-16 | Phase 1: Query Key 컨벤션 추가 (factory 패턴, ESLint 설정)                                         |
| 2026-02-16 | Phase 2: Path Alias 컨벤션 추가 (@/ 제거, 세부 alias 통일, @store 추가, @types 금지)               |
| 2026-02-17 | Phase 3: 네이밍 컨벤션 추가 ({Feature}Page, Query/Mutation 접미사, 코드 네이밍 규칙)               |
| 2026-02-17 | Phase 3 보완: mypage/login 훅 접미사, 컴포넌트명=파일명 규칙, 폴더 camelCase, dead code 삭제       |
| 2026-02-17 | Phase 4: 폴더 구조 정규화 (Detection 분리, cross-feature import 해소, steps 리네임)                |
| 2026-02-17 | Phase 4 보완: shared/apis/ 인프라-도메인 분리 (config/ 하위폴더)                                   |
| 2026-02-17 | Phase 5: Export 컨벤션 추가 (컴포넌트 default, 훅/유틸 named, barrel/mixed 금지)                   |
| 2026-02-17 | Phase 6: API/데이터 페칭 컨벤션 추가 (queries/mutations 구조, request() rawResponse, 훅 위치 규칙) |
