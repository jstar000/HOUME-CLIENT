import { useQuery } from '@tanstack/react-query';
import { getFloorPlan } from '../apis/step2';

export const useFloorPlanApi = () => {
  const query = useQuery({
    queryKey: ['floorPlan'],
    queryFn: getFloorPlan,
  });

  return query;
};
