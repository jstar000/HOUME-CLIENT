import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CloseBottomSheet from './CloseBottomSheet';
import DragHandleBottomSheet from './DragHandleBottomSheet';

describe('CloseBottomSheet', () => {
  it('backdrop과 닫기 버튼으로 dismiss된다', async () => {
    const onClose = vi.fn();

    const { rerender } = render(
      <CloseBottomSheet
        open
        onClose={onClose}
        titleSlot={<div>타이틀</div>}
        contentSlot={<div>콘텐츠</div>}
        primaryAction={{ label: '확인' }}
        secondaryAction={{ label: '다시 선택' }}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('콘텐츠')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('close-bottom-sheet-backdrop'));
    await userEvent.click(screen.getByRole('button', { name: '닫기' }));

    expect(onClose).toHaveBeenCalledTimes(2);

    rerender(
      <CloseBottomSheet
        open={false}
        onClose={onClose}
        contentSlot={<div>콘텐츠</div>}
        primaryAction={{ label: '확인' }}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('DragHandleBottomSheet', () => {
  it('backdrop 클릭으로 닫히지 않고 collapsed 상태로 시작한다', async () => {
    const onExpandedChange = vi.fn();

    render(
      <DragHandleBottomSheet
        open
        expanded={false}
        onExpandedChange={onExpandedChange}
        collapsedHeight="240px"
        contentSlot={<div>콘텐츠</div>}
        primaryAction={{ label: '선택 완료' }}
        secondaryAction={{ label: '다시 선택' }}
      />
    );

    const panel = screen.getByTestId('drag-handle-bottom-sheet-panel');

    expect(panel).toHaveStyle({ height: '240px' });

    await userEvent.click(
      screen.getByTestId('drag-handle-bottom-sheet-backdrop')
    );

    expect(onExpandedChange).not.toHaveBeenCalled();
  });

  it('핸들을 위로 드래그하면 expanded 상태 변경을 요청한다', () => {
    const onExpandedChange = vi.fn();

    render(
      <DragHandleBottomSheet
        open
        expanded={false}
        onExpandedChange={onExpandedChange}
        collapsedHeight="240px"
        contentSlot={<div>콘텐츠</div>}
        primaryAction={{ label: '선택 완료' }}
      />
    );

    const handle = screen.getByRole('button', { name: '바텀시트 크기 조절' });
    const panel = screen.getByTestId('drag-handle-bottom-sheet-panel');

    fireEvent.pointerDown(handle, { clientY: 400 });
    fireEvent.pointerMove(window, { clientY: 200 });
    fireEvent.pointerUp(window, { clientY: 200 });

    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(panel).toHaveStyle({ height: '240px' });
  });

  it('expanded 상태에서 아래로 드래그하면 collapsed 상태 변경을 요청한다', () => {
    const onExpandedChange = vi.fn();

    render(
      <DragHandleBottomSheet
        open
        expanded
        onExpandedChange={onExpandedChange}
        collapsedHeight="240px"
        contentSlot={<div>콘텐츠</div>}
        primaryAction={{ label: '선택 완료' }}
      />
    );

    const handle = screen.getByRole('button', { name: '바텀시트 크기 조절' });

    fireEvent.pointerDown(handle, { clientY: 200 });
    fireEvent.pointerMove(window, { clientY: 380 });
    fireEvent.pointerUp(window, { clientY: 380 });

    expect(onExpandedChange).toHaveBeenCalledWith(false);
  });
});
