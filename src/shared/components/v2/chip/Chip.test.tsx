import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Chip from './Chip';

describe('Chip', () => {
  it('기본 라벨을 버튼으로 렌더링하고 클릭 시 onClick을 호출한다', async () => {
    const onClick = vi.fn();

    render(<Chip onClick={onClick}>레이블</Chip>);

    const button = screen.getByRole('button', { name: '레이블' });

    expect(button).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('selected와 suffixIcon을 전달하면 선택 상태와 suffix icon을 반영한다', () => {
    render(
      <Chip selected suffixIcon={<span data-testid="suffix-icon">v</span>}>
        레이블
      </Chip>
    );

    expect(screen.getByRole('button', { name: '레이블' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
  });
});
