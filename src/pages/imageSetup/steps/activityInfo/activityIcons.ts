// 주요활동 code → 아이콘 SVG 매핑
// 서버가 아이콘을 내려주지 않으므로, 클라이언트에서 code 기반으로 매핑
import type { ComponentType, SVGProps } from 'react';

import BookBlack from '@assets/v2/svg/BookBlack.svg?react';
import BookGray from '@assets/v2/svg/BookGray.svg?react';
import CupBlack from '@assets/v2/svg/CupBlack.svg?react';
import CupGray from '@assets/v2/svg/CupGray.svg?react';
import DeskBlack from '@assets/v2/svg/DeskBlack.svg?react';
import DeskGray from '@assets/v2/svg/DeskGray.svg?react';
import MouseBlack from '@assets/v2/svg/MouseBlack.svg?react';
import MouseGray from '@assets/v2/svg/MouseGray.svg?react';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface ActivityIcons {
  gray: SvgIcon;
  black: SvgIcon;
}

// 활동 code → 아이콘 매핑 (gray: 미선택, black: 선택)
const ACTIVITY_ICON_MAP: Record<string, ActivityIcons> = {
  REMOTE_WORK: { gray: MouseGray, black: MouseBlack },
  READING: { gray: BookGray, black: BookBlack },
  FLOOR_LIVING: { gray: DeskGray, black: DeskBlack },
  HOME_CAFE: { gray: CupGray, black: CupBlack },
};

export const getActivityIcon = (
  activityCode: string,
  variant: 'gray' | 'black' = 'gray'
): SvgIcon | null => {
  return ACTIVITY_ICON_MAP[activityCode]?.[variant] ?? null;
};
