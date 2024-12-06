import { useState, useEffect } from 'react';

import { TOptionsModel } from '@/types/option-type';
import { TBankModel } from '@/types/bank-type';
import { List } from '@/api/bank-api';

export const useFetchOptionsBank = (token: string) => {
  const [optionsBank, setOptionsBank] = useState<TOptionsModel[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await List(token);
        const transformedOptions = response.result.map((item: TBankModel) => ({
          value: item.nama_bank,
          label: item.nama_bank,
        }));
        setOptionsBank(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsBank };
};
