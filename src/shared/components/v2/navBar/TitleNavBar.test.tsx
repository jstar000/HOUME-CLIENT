import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TitleNavBar from './TitleNavBar';

describe('TitleNavBar', () => {
  it('제목, 경로 텍스트, 우측 슬롯을 렌더링하고 뒤로가기 콜백을 호출한다', async () => {
    const onBackClick = vi.fn();

    render(
      <TitleNavBar
        title="도면 선택"
        backLabel="경로"
        onBackClick={onBackClick}
        rightSlot={<button type="button">도움말</button>}
      />
    );

    expect(screen.getByText('도면 선택')).toBeInTheDocument();
    expect(screen.getByText('경로')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '도움말' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '경로' }));

    expect(onBackClick).toHaveBeenCalledTimes(1);
  });
});
