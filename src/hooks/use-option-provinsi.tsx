import { useState, useEffect } from 'react';

import { TOptionsModel } from '@/types/option-type';
import { TProvinsiModel } from '@/types/provinsi-type';
import { List } from '@/api/provinsi-api';

export const useFetchOptionsProvinsi = (token: string) => {
  const [optionsProvinsi, setOptionsProvinsi] = useState<TOptionsModel[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await List(token);
        const transformedOptions = response.result.map(
          (item: TProvinsiModel) => ({
            value: item.nama_provinsi,
            label: item.nama_provinsi,
          })
        );
        setOptionsProvinsi(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsProvinsi };
};
