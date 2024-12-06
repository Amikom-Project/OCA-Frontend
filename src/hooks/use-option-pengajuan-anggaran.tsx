import { useState, useEffect, useCallback } from 'react';
import { TOptionsModel } from '@/types/option-type';
import { TOptionPengajuanAnggaranModel } from '@/types/pengajuan-anggaran-type';
import { List } from '@/api/pengajuan-anggaran-api';

export const useFetchOptionsPengajuanAnggaran = (
  idl: string,
  token: string
) => {
  const [optionsPengajuanAnggaran, setOptionsPengajuanAnggaran] = useState<
    TOptionsModel[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchOptions = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await List(idl, token, page, limit);
      const transformedOptions = response.result.map(
        (item: TOptionPengajuanAnggaranModel) => ({
          value: item.no_pengajuan,
          label: `${item.no_pengajuan} - ${item.kegiatan}`,
        })
      );

      setOptionsPengajuanAnggaran((prev) => {
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
  }, [idl, token, page, hasMore, loading]);

  useEffect(() => {
    if (idl) {
      fetchOptions();
    }
  }, [idl, fetchOptions]);

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

  return { optionsPengajuanAnggaran, loading, hasMore, fetchOptions };
};
