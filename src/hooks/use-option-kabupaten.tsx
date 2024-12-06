import { useState, useEffect } from 'react';
import { TOptionsModel } from '@/types/option-type';
import { TKabupatenModel } from '@/types/kabupaten-type';
import { List } from '@/api/kabupaten-api';

export const useFetchOptionsKabupaten = (
  token: string,
  nama_provinsi: string
) => {
  const [optionsKabupaten, setOptionsKabupaten] = useState<TOptionsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!nama_provinsi) {
      setOptionsKabupaten([]);
      return;
    }

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await List(token, nama_provinsi);
        const transformedOptions = response.result.map(
          (item: TKabupatenModel) => ({
            value: item.nama_kabupaten,
            label: item.nama_kabupaten,
          })
        );
        setOptionsKabupaten(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [token, nama_provinsi]);

  return { optionsKabupaten, loading };
};
