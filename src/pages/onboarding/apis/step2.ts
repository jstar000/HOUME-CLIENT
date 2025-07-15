import { HTTPMethod, type RequestConfig, request } from '@/shared/apis/request';

export interface FloorPlanList {
  id: number;
  form: string;
  structure: string;
  floorPlanImage: string;
}

export interface FloorPlanResponse {
  code: number;
  msg: string;
  data: {
    floorPlanList: FloorPlanList[];
  };
}

export const getFloorPlan = async (): Promise<FloorPlanResponse['data']> => {
  const config: RequestConfig = {
    method: HTTPMethod.GET,
    url: '/api/v1/house-templates',
  };

  return await request<FloorPlanResponse['data']>(config);
};
