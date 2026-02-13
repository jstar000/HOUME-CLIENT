Scaffold a new feature page following HOUME's domain-driven structure.
Feature name: $ARGUMENTS

## Before creating, read these reference files first:

- `src/pages/generate/GeneratePage.tsx` — feature page component pattern
- `src/routes/router.tsx` — routing setup (line 109-115 for lazy pattern)
- `src/routes/paths.ts` — route constants (ROUTES object)

## Directory structure to create:

```
src/pages/{featureName}/
  ├── {FeatureName}Page.tsx        # Main page component (default export)
  ├── apis/                        # Feature-specific API calls
  │   └── {resource}.ts
  ├── components/                  # Feature UI components
  │   └── {ComponentName}/
  │       ├── {ComponentName}.tsx
  │       └── {ComponentName}.css.ts
  ├── hooks/                       # Business logic hooks
  │   └── use{FeatureName}.ts
  └── types/                       # Feature type definitions
      └── {featureName}.ts
```

Only create directories that are actually needed. Don't create empty folders.

## Routing setup:

### 1. Add route constant to `src/routes/paths.ts`:

```ts
FEATURE_NAME: '/featureName',
```

### 2. Add lazy route to `src/routes/router.tsx`:

```ts
// Use lazy loading pattern (from Error404Page):
{
  path: ROUTES.FEATURE_NAME,
  lazy: async () => {
    const { default: FeatureNamePage } = await import('@/pages/featureName/FeatureNamePage');
    return { Component: FeatureNamePage };
  },
}
```

Add to `publicRoutes` or `protectedRoutes` array depending on auth requirements.

## After creating:

1. Run `pnpm lint --fix`
2. Run `pnpm format`
3. Run `pnpm build` to verify the build succeeds
