import { useQuery } from '@tanstack/react-query';

import { ListEntry, ListVerifikasi, ListSetor } from '@/api/pph-23-api';

export const ListPPh23Entry = (
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['data', idl, page, limit],
    queryFn: () => ListEntry(idl, page, limit, token, search),
    enabled: !!token,
  });
};

export const ListPPh23Verifikasi = (
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['data', idl, page, limit],
    queryFn: () => ListVerifikasi(idl, page, limit, token, search),
    enabled: !!token,
  });
};

export const ListPPh23Setor = (
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) => {
  return useQuery({
    queryKey: ['data', idl, page, limit],
    queryFn: () => ListSetor(idl, page, limit, token, search),
    enabled: !!token,
  });
};
