import { useState, useEffect } from 'react';

import { TOptionsObjekPajakModel } from '@/types/option-type';
import { TOptionObjekPajakModel } from '@/types/objek-pajak-type';
import {
  ListPPh21,
  ListPPh23,
  ListPPh4Ayat2,
  ListPPN,
} from '@/api/objek-pajak-api';

export const useFetchOptionsObjekPajakPPh21 = (token: string) => {
  const [optionsObjekPajakPPh21, setOptionsObjekPajakPPh21] = useState<
    TOptionsObjekPajakModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPh21(token);
        const transformedOptions = response.result.map(
          (item: TOptionObjekPajakModel) => ({
            value: item.kode_objek_pajak,
            label: item.objek_pajak,
            tarif_npwp: item.tarif_npwp,
            tarif_non_npwp: item.tarif_non_npwp,
          })
        );
        setOptionsObjekPajakPPh21(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsObjekPajakPPh21 };
};

export const useFetchOptionsObjekPajakPPh23 = (token: string) => {
  const [optionsObjekPajakPPh23, setOptionsObjekPajakPPh23] = useState<
    TOptionsObjekPajakModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPh23(token);
        const transformedOptions = response.result.map(
          (item: TOptionObjekPajakModel) => ({
            value: item.kode_objek_pajak,
            label: item.objek_pajak,
            tarif_npwp: item.tarif_npwp,
            tarif_non_npwp: item.tarif_non_npwp,
          })
        );
        setOptionsObjekPajakPPh23(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsObjekPajakPPh23 };
};

export const useFetchOptionsObjekPajakPPh4Ayat2 = (token: string) => {
  const [optionsObjekPajakPPh4Ayat2, setOptionsObjekPajakPPh4Ayat2] = useState<
    TOptionsObjekPajakModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPh4Ayat2(token);
        const transformedOptions = response.result.map(
          (item: TOptionObjekPajakModel) => ({
            value: item.kode_objek_pajak,
            label: item.objek_pajak,
            tarif_npwp: item.tarif_npwp,
            tarif_non_npwp: item.tarif_non_npwp,
          })
        );
        setOptionsObjekPajakPPh4Ayat2(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsObjekPajakPPh4Ayat2 };
};

export const useFetchOptionsObjekPajakPPN = (token: string) => {
  const [optionsObjekPajakPPN, setOptionsObjekPajakPPN] = useState<
    TOptionsObjekPajakModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPPN(token);
        const transformedOptions = response.result.map(
          (item: TOptionObjekPajakModel) => ({
            value: item.kode_objek_pajak,
            label: item.objek_pajak,
            tarif_npwp: item.tarif_npwp,
            tarif_non_npwp: item.tarif_non_npwp,
          })
        );
        setOptionsObjekPajakPPN(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsObjekPajakPPN };
};
