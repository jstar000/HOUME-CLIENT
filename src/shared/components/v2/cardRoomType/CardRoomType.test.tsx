import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CardRoomType from './CardRoomType';

describe('CardRoomType', () => {
  it('default m variant는 이미지와 최근 생성 배지를 렌더링한다', () => {
    render(
      <CardRoomType
        type="default"
        size="m"
        label="거실"
        imageSrc="/room.png"
        showRecentBadge
      />
    );

    expect(screen.getByText('거실')).toBeInTheDocument();
    expect(screen.getByText('최근에 생성됨')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: '거실' });
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveAttribute('draggable', 'false');
  });

  it('more variant는 더보기 문구를 렌더링하고 클릭 시 onClick을 호출한다', async () => {
    const onClick = vi.fn();

    render(<CardRoomType type="more" size="s" onClick={onClick} />);

    await userEvent.click(
      screen.getByRole('button', { name: '눌러서 공간 유형 더보기' })
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('이미지 로드 실패 시 fallback 이미지를 사용한다', () => {
    render(
      <CardRoomType
        type="default"
        size="s"
        label="침실"
        imageSrc="/broken-image.png"
      />
    );

    const image = screen.getByRole('img', { name: '침실' }) as HTMLImageElement;

    fireEvent.error(image);

    expect(image.src).not.toContain('/broken-image.png');
  });
});
