import { useState, useEffect } from 'react';

import { TOptionsModel } from '@/types/option-type';
import { TOptionJenisPenghasilanModel } from '@/types/jenis-penghasilan-type';
import {
  ListPPh21,
  ListPPh23,
  ListPPh4Ayat2,
} from '@/api/jenis-penghasilan-api';

export const useFetchOptionsJenisPenghasilanPPh21 = (token: string) => {
  const [optionsJenisPenghasilan, setOptionsJenisPenghasilan] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPh21(token);
        const transformedOptions = response.result.map(
          (item: TOptionJenisPenghasilanModel) => ({
            value: item.jenis_penghasilan,
            label: item.jenis_penghasilan,
          })
        );
        setOptionsJenisPenghasilan(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsJenisPenghasilan };
};

export const useFetchOptionsJenisPenghasilanPPh23 = (token: string) => {
  const [optionsJenisPenghasilan, setOptionsJenisPenghasilan] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPh23(token);
        const transformedOptions = response.result.map(
          (item: TOptionJenisPenghasilanModel) => ({
            value: item.jenis_penghasilan,
            label: item.jenis_penghasilan,
          })
        );
        setOptionsJenisPenghasilan(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsJenisPenghasilan };
};

export const useFetchOptionsJenisPenghasilanPPh4Ayat2 = (token: string) => {
  const [optionsJenisPenghasilan, setOptionsJenisPenghasilan] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPh4Ayat2(token);
        const transformedOptions = response.result.map(
          (item: TOptionJenisPenghasilanModel) => ({
            value: item.jenis_penghasilan,
            label: item.jenis_penghasilan,
          })
        );
        setOptionsJenisPenghasilan(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsJenisPenghasilan };
};
