import axios from 'axios';

import { TWajibPajakOrangPribadiFormSchema } from '@/types/wajib-pajak-orang-pribadi-type';

export async function Create(
  input: TWajibPajakOrangPribadiFormSchema,
  token: string
) {
  try {
    const res = await axios.post(`/api/wajib-pajak-orang-pribadi`, input, {
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
  page: number,
  limit: number,
  token: string,
  search?: string
) {
  try {
    const res = await axios.get(
      `/api/wajib-pajak-orang-pribadi?page=${page}&limit=${limit}&search=${
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

export async function Get(
  kode_wajib_pajak_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.get(
      `/api/wajib-pajak-orang-pribadi/${kode_wajib_pajak_orang_pribadi}`,
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

export async function Update(
  input: TWajibPajakOrangPribadiFormSchema,
  kode_wajib_pajak_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.put(
      `/api/wajib-pajak-orang-pribadi/${kode_wajib_pajak_orang_pribadi}`,
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

export async function Delete(
  kode_wajib_pajak_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.delete(
      `/api/wajib-pajak-orang-pribadi/${kode_wajib_pajak_orang_pribadi}`,
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
