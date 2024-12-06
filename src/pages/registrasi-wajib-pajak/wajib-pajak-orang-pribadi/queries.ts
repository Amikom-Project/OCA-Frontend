import { useQuery } from '@tanstack/react-query';

import { List, Get } from '@/api/wajib-pajak-orang-pribadi-api';

export const ListWajibPajakOrangPribadi = (
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

export const GetWajibPajakOrangPribadi = (
  kode_wajib_pajak_orang_pribadi: string,
  token: string
) => {
  return useQuery({
    queryKey: ['data', kode_wajib_pajak_orang_pribadi],
    queryFn: () => Get(kode_wajib_pajak_orang_pribadi, token),
    enabled: !!token && !!kode_wajib_pajak_orang_pribadi,
  });
};
