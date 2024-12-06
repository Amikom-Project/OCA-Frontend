import { useQuery } from '@tanstack/react-query';

import { List } from '@/api/pph-4-ayat-2-api';

export const ListPPh4Ayat2 = (
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
