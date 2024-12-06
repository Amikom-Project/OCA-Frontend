import { useState, useEffect, useCallback } from 'react';
import { TOptionsNamaPenerimaWajibPajakBadanUsahaModel } from '@/types/option-type';
import { TWajibPajakBadanUsahaModel } from '@/types/wajib-pajak-badan-usaha-type';
import { List } from '@/api/wajib-pajak-badan-usaha-api';

export const useFetchOptionsWajibPajakBadanUsaha = (token: string) => {
  const [optionsWajibPajakBadanUsaha, setOptionsWajibPajakBadanUsaha] =
    useState<TOptionsNamaPenerimaWajibPajakBadanUsahaModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchOptions = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await List(page, limit, token);
      const transformedOptions = response.result.map(
        (item: TWajibPajakBadanUsahaModel) => ({
          value: item.nama_badan_usaha,
          label: item.nama_badan_usaha,
          nama_bank: item.nama_bank,
          no_rekening: item.no_rekening,
          nama_rekening: item.nama_rekening,
          npwp: item.npwp,
          masa_berlaku_bebas_pph23: item.masa_berlaku_bebas_pph23,
        })
      );

      setOptionsWajibPajakBadanUsaha((prev) => {
        const newOptions = transformedOptions.filter(
          (newItem) =>
            !prev.some((existingItem) => existingItem.value === newItem.value)
        );
        return [...prev, ...newOptions];
      });

      setHasMore(response.current_page < response.total_page);

      if (response.current_page < response.total_page) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setLoading(false);
    }
  }, [token, page, hasMore, loading]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;

      if (bottom && hasMore && !loading) {
        fetchOptions();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading, fetchOptions]);

  return { optionsWajibPajakBadanUsaha, loading, hasMore, fetchOptions };
};
