import { useQuery } from '@tanstack/react-query';

import { Get, List } from '@/api/pph-21-kegiatan-api';

export const ListPPh21Kegiatan = (
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['data', idl, page, limit, search],
    queryFn: () => List(idl, page, limit, token, search),
    enabled: !!token,
  });
};

export const GetPPh21Kegiatan = (
  kode_kegiatan_penghasilan_orang_pribadi: string,
  token: string
) => {
  return useQuery({
    queryKey: ['data', kode_kegiatan_penghasilan_orang_pribadi],
    queryFn: () => Get(kode_kegiatan_penghasilan_orang_pribadi, token),
    enabled: !!token && !!kode_kegiatan_penghasilan_orang_pribadi,
  });
};
