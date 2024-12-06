import { useQuery } from '@tanstack/react-query';

import {
  ListEntry,
  ListVerifikasi,
  ListSetor,
} from '@/api/pph-21-penerima-api';

export const ListPPh21PenerimaEntry = (
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

export const ListPPh21PenerimaVerifikasi = (
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

export const ListPPh21PenerimaSetor = (
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
