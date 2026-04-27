import { useQuery } from '@tanstack/react-query';

import type { ExploreHouseTemplateListResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { FloorPlanFilters } from '../../types/floorPlan';

interface HouseTemplatesParams extends Partial<FloorPlanFilters> {
  size?: number;
}

export const getHouseTemplates = async (
  params: HouseTemplatesParams
): Promise<ExploreHouseTemplateListResponse> => {
  const query: Record<string, string[] | number> = {};
  if (params.size !== undefined) query.size = params.size;
  if (params.residenceType?.length) query.residenceType = params.residenceType;
  if (params.layoutType?.length) query.layoutType = params.layoutType;
  if (params.equilibrium?.length) query.equilibrium = params.equilibrium;

  return request<ExploreHouseTemplateListResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.IMAGE_SETUP.HOUSE_TEMPLATES,
    query,
  });
};

export const useHouseTemplatesQuery = (params: HouseTemplatesParams) => {
  return useQuery({
    queryKey: queryKeys.imageSetup.houseTemplates(params),
    queryFn: () => getHouseTemplates(params),
  });
};
