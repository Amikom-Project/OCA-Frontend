import axios from 'axios';

import { TInventarisasiPajakFormSchema } from '@/types/inventarisasi-pajak-type';

export async function Create(
  input: TInventarisasiPajakFormSchema,
  token: string
) {
  try {
    const res = await axios.post(`/api/inventarisasi-pajak`, input, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    const err = error as Error;

    if (axios.isAxiosError(error)) {
      console.log('error : ', error.response?.data.message);
    }

    console.log('error : ', err.message);
    throw err;
  }
}

export async function List(
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) {
  try {
    const res = await axios.get(
      `/api/inventarisasi-pajak?idl=${idl}&page=${page}&limit=${limit}&search=${
        search || ''
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    const err = error as Error;

    if (axios.isAxiosError(error)) {
      console.log('error : ', error.response?.data.message);
    }

    console.log('error : ', err.message);
    throw err;
  }
}

export async function Get(kode_inventarisasi_pajak: string, token: string) {
  try {
    const res = await axios.get(
      `/api/inventarisasi-pajak/${kode_inventarisasi_pajak}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const err = error as Error;

    if (axios.isAxiosError(error)) {
      console.log('error : ', error.response?.data.message);
    }

    console.log('error : ', err.message);
    throw err;
  }
}

export async function Update(
  input: TInventarisasiPajakFormSchema,
  kode_inventarisasi_pajak: string,
  token: string
) {
  try {
    const res = await axios.put(
      `/api/inventarisasi-pajak/${kode_inventarisasi_pajak}`,
      input,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const err = error as Error;

    if (axios.isAxiosError(error)) {
      console.log('error : ', error.response?.data.message);
    }

    console.log('error : ', err.message);
    throw err;
  }
}

export async function Delete(kode_inventarisasi_pajak: string, token: string) {
  try {
    const res = await axios.delete(
      `/api/inventarisasi-pajak/${kode_inventarisasi_pajak}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.result;
  } catch (error) {
    const err = error as Error;

    if (axios.isAxiosError(error)) {
      console.log('error : ', error.response?.data.message);
    }

    console.log('error : ', err.message);
    throw err;
  }
}
