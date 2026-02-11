Create a new API endpoint following HOUME project patterns.
Description: $ARGUMENTS

## Before writing any code, read these reference files first:

- `src/shared/apis/request.ts` — request wrapper (HTTPMethod, RequestConfig, request<T>)
- `src/shared/constants/apiEndpoints.ts` — API_ENDPOINT constant structure
- `src/shared/constants/queryKey.ts` — QUERY_KEY constants
- `src/pages/generate/apis/generate.ts` — complete API function examples
- `src/shared/types/apis.ts` — BaseResponse<T> type

## Steps (in order):

### 1. Add endpoint to `src/shared/constants/apiEndpoints.ts`

Add to the appropriate domain group in API_ENDPOINT.

- Static: `RESOURCE: '/api/v1/resource'`
- Dynamic: `RESOURCE: (id: number) => \`/api/v1/resource/\${id}\``

### 2. Add query key to `src/shared/constants/queryKey.ts`

```ts
RESOURCE_NAME: 'resource-name',  // BIG_SNAKE_CASE key, kebab-case value
```

### 3. Create response types

Location depends on scope:

- Feature-specific: `src/pages/{feature}/types/{resource}.ts`
- Shared: `src/shared/types/{resource}.ts`

```ts
interface ResourceData {
  id: number;
  name: string;
}

export interface ResourceResponse {
  data: ResourceData;
}
```

### 4. Create API function

Location: `src/pages/{feature}/apis/{resource}.ts`

```ts
import { HTTPMethod, request, type RequestConfig } from '@/shared/apis/request';
import { API_ENDPOINT } from '@constants/apiEndpoints';
import type { ResourceResponse } from '@pages/{feature}/types/{resource}';

// GET example
export const getResource = async (): Promise<ResourceResponse['data']> => {
  return request<ResourceResponse['data']>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.DOMAIN.RESOURCE,
  });
};

// POST example
export const postResource = async (
  data: RequestBody
): Promise<ResponseType['data']> => {
  return request<ResponseType['data']>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.DOMAIN.RESOURCE,
    body: data,
  });
};
```

### 5. Create TanStack Query hook

Location: `src/pages/{feature}/hooks/use{Resource}.ts`

```ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { getResource } from '@pages/{feature}/apis/{resource}';

// Naming: use + HTTP verb + Resource + Query/Mutation
export const useGetResourceQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.RESOURCE_NAME],
    queryFn: getResource,
  });
};

export const usePostResourceMutation = () => {
  return useMutation({
    mutationFn: postResource,
  });
};
```

## After creating all files:

1. Run `pnpm lint --fix`
2. Run `pnpm format`
3. Run `npx tsc --noEmit` to verify types
