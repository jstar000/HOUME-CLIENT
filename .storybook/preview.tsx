import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { Preview } from '@storybook/react-vite';
import '@shared/styles/global.css';
import './preview.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <QueryClientProvider client={queryClient}>
        {context.viewMode === 'story' ? (
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              margin: '0 auto',
              boxSizing: 'border-box',
            }}
          >
            <Story />
          </div>
        ) : (
          <Story />
        )}
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: {
      // argTypesRegex 제거 - Chromatic 시각적 테스트와 호환성을 위해
      // 각 스토리에서 fn() 함수로 명시적 액션 설정 필요
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#242424',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile360: {
          name: 'Mobile 360',
          styles: {
            width: '360px',
            height: '667px',
          },
        },
        mobile375: {
          name: 'Mobile 375',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobile440: {
          name: 'Mobile 440',
          styles: {
            width: '440px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'mobile375',
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
      context: '#storybook-root',
      config: {},
      options: {},
      manual: false,
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
};

export default preview;
