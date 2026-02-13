Create a new shared component following HOUME project patterns.
Component name: $ARGUMENTS

## Before writing any code, read these reference files first:

- `src/shared/components/button/ctaButton/CtaButton.tsx` — component structure pattern
- `src/shared/components/button/ctaButton/CtaButton.css.ts` — Vanilla Extract pattern (recipe, style, colorVars, fontStyle)
- `src/shared/styles/tokens/color.css.ts` — available color tokens
- `src/shared/styles/fontStyle.ts` — font helper function

## Files to create:

1. **Component**: `src/shared/components/{camelCaseFolder}/{PascalCaseName}.tsx`
2. **Styles**: `src/shared/components/{camelCaseFolder}/{PascalCaseName}.css.ts`
3. **Story**: `src/stories/{PascalCaseName}.stories.tsx`

## Component pattern (from CtaButton):

```tsx
// {PascalCaseName}.tsx
import * as styles from './{PascalCaseName}.css';

interface {PascalCaseName}Props extends React.ComponentProps<'{element}'> {
  // props here
}

const {PascalCaseName} = ({ ...props }: {PascalCaseName}Props) => {
  return ( ... );
};

export default {PascalCaseName};
```

## Style pattern (from CtaButton.css.ts):

```ts
// {PascalCaseName}.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes'; // only if variants needed
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@styles/tokens/color.css';

// Use recipe() for components with variants, style() for single-purpose
// Use colorVars.color.xxx for colors, fontStyle('title_m_16') for fonts
// Never use raw CSS color values or font declarations
```

## Story pattern (from CtaButton.stories.tsx):

```tsx
import {PascalCaseName} from '@components/{camelCaseFolder}/{PascalCaseName}';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof {PascalCaseName}> = {
  title: 'shared/{category}/{PascalCaseName}',
  component: {PascalCaseName},
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '컴포넌트 설명' } },
  },
};
export default meta;
type Story = StoryObj<typeof {PascalCaseName}>;

export const Default: Story = { args: { ... } };
```

## After creating all files:

1. Run `pnpm lint --fix` to auto-sort imports
2. Run `pnpm format` to format code
