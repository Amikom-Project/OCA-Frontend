import { useQuery } from '@tanstack/react-query';

import { List } from '@/api/pph-21-penerima-api';

export const ListPPh21Penerima = (
  kode_kegiatan_penghasilan_orang_pribadi: string,
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: [
      'data',
      kode_kegiatan_penghasilan_orang_pribadi,
      idl,
      page,
      limit,
      search,
    ],
    queryFn: () =>
      List(
        kode_kegiatan_penghasilan_orang_pribadi,
        idl,
        page,
        limit,
        token,
        search
      ),
    enabled: !!token && !!kode_kegiatan_penghasilan_orang_pribadi && !!idl,
  });
};
