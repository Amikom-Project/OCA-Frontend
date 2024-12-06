import { useState, useEffect } from 'react';

import { TOptionsModel } from '@/types/option-type';
import { TMetodePotongModel } from '@/types/metode-potong-type';
import {
  ListPegawaiTetap,
  ListPegawaiTidakTetap,
  ListBukanPegawai,
  ListDewanKomisaris,
  ListMantanPegawai,
  ListWargaNegaraAsing,
} from '@/api/metode-potong-api';

export const useFetchOptionsPegawaiTetap = (token: string) => {
  const [optionsPegawaiTetap, setOptionsPegawaiTetap] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPegawaiTetap(token);
        const transformedOptions = response.result.map(
          (item: TMetodePotongModel) => ({
            value: item.metode_potong,
            label: item.metode_potong,
          })
        );
        setOptionsPegawaiTetap(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsPegawaiTetap };
};

export const useFetchOptionsPegawaiTidakTetao = (token: string) => {
  const [optionsPegawaiTidakTetap, setOptionsPegawaiTetap] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListPegawaiTidakTetap(token);
        const transformedOptions = response.result.map(
          (item: TMetodePotongModel) => ({
            value: item.metode_potong,
            label: item.metode_potong,
          })
        );
        setOptionsPegawaiTetap(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsPegawaiTidakTetap };
};

export const useFetchOptionsBukanPegawai = (token: string) => {
  const [optionsBukanPegawai, setOptionsBukanPegawai] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListBukanPegawai(token);
        const transformedOptions = response.result.map(
          (item: TMetodePotongModel) => ({
            value: item.metode_potong,
            label: item.metode_potong,
          })
        );
        setOptionsBukanPegawai(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsBukanPegawai };
};

export const useFetchOptionsMantanPegawai = (token: string) => {
  const [optionsMantanPegawai, setOptionsMantanPegawai] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListMantanPegawai(token);
        const transformedOptions = response.result.map(
          (item: TMetodePotongModel) => ({
            value: item.metode_potong,
            label: item.metode_potong,
          })
        );
        setOptionsMantanPegawai(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsMantanPegawai };
};

export const useFetchOptionsDewanKomisaris = (token: string) => {
  const [optionsDewanKomisaris, setOptionsDewanKomisaris] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListDewanKomisaris(token);
        const transformedOptions = response.result.map(
          (item: TMetodePotongModel) => ({
            value: item.metode_potong,
            label: item.metode_potong,
          })
        );
        setOptionsDewanKomisaris(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsDewanKomisaris };
};

export const useFetchOptionsWarganNegaraAsing = (token: string) => {
  const [optionsWargaNegaraAsing, setOptionsWargaNegaraAsing] = useState<
    TOptionsModel[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await ListWargaNegaraAsing(token);
        const transformedOptions = response.result.map(
          (item: TMetodePotongModel) => ({
            value: item.metode_potong,
            label: item.metode_potong,
          })
        );
        setOptionsWargaNegaraAsing(transformedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [token]);

  return { optionsWargaNegaraAsing };
};
