import { useQuery } from '@tanstack/react-query';

import { List } from '@/api/pph-23-api';

export const ListPPh23 = (
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['data', idl, page, limit],
    queryFn: () => List(idl, page, limit, token, search),
    enabled: !!token,
  });
};
