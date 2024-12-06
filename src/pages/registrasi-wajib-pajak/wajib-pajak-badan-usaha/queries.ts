import { useQuery } from '@tanstack/react-query';

import { List } from '@/api/wajib-pajak-badan-usaha-api';

export const ListWajibPajakBadanUsaha = (
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['data', page, limit, search],
    queryFn: () => List(page, limit, token, search),
    enabled: !!token,
  });
};
