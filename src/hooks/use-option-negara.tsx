import { useState, useEffect } from 'react';

import { TOptionsModel } from '@/types/option-type';
import { TNegaraModel } from '@/types/negara-type';
import { List } from '@/api/negara-api';

export const useFetchOptionsNegara = (token: string) => {
  const [optionsNegara, setOptionsNegara] = useState<TOptionsModel[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await List(token);
        const transformedOptions = response.result.map(
          (item: TNegaraModel) => ({
            value: item.nama_negara,
            label: item.nama_negara,
          })
        );
        setOptionsNegara(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsNegara };
};
