import { useQuery } from '@tanstack/react-query';

import { Count } from '@/api/dashboard-api';

export const useGetCountPPh = (idl: string, token: string) => {
  return useQuery({
    queryKey: ['data', idl],
    queryFn: () => Count(idl, token),
    enabled: !!token,
  });
};
