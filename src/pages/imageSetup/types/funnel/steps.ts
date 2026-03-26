interface FloorPlan {
  floorPlanId: number;
  isMirror: boolean;
}

// Funnel Step 정의 (v2: HouseInfo + FloorPlan → SpaceSelect)
export type ImageSetupSteps = {
  // SpaceSelect: 도면 선택 결과만 관리
  SpaceSelect: {
    floorPlan?: FloorPlan;
  };
  // 이전 단계 입력값 누적 + moodBoardIds
  InteriorStyle: {
    floorPlan: FloorPlan;
    moodBoardIds?: number[];
  };
  // 이전 단계 입력값 누적 + activityType, selectiveIds
  ActivityInfo: {
    floorPlan: FloorPlan;
    moodBoardIds: number[];
    activityType?: string;
    selectiveIds?: number[];
  };
};

export type CompletedSpaceSelect = Required<ImageSetupSteps['SpaceSelect']>;
export type CompletedInteriorStyle = Required<ImageSetupSteps['InteriorStyle']>;
