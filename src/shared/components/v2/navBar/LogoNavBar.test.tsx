import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import LogoNavBar from './LogoNavBar';

describe('LogoNavBar', () => {
  it('이미지 생성 버튼과 로그인 버튼을 함께 렌더링하고 클릭 콜백을 호출한다', async () => {
    const onGenerateClick = vi.fn();
    const onLoginClick = vi.fn();

    render(
      <LogoNavBar
        showGenerateButton
        authSlot="login"
        onGenerateClick={onGenerateClick}
        onLoginClick={onLoginClick}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: '이미지 생성' }));
    await userEvent.click(screen.getByRole('button', { name: '로그인' }));

    expect(onGenerateClick).toHaveBeenCalledTimes(1);
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  it('프로필 슬롯을 선택하면 프로필 버튼을 렌더링한다', async () => {
    const onProfileClick = vi.fn();

    render(<LogoNavBar authSlot="profile" onProfileClick={onProfileClick} />);

    await userEvent.click(screen.getByRole('button', { name: '프로필' }));

    expect(onProfileClick).toHaveBeenCalledTimes(1);
  });
});
