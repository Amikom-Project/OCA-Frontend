import axios from 'axios';

import { TPPh21KegiatanFormSchema } from '@/types/pph-21-kegiatan-type';

export async function Create(input: TPPh21KegiatanFormSchema, token: string) {
  try {
    const res = await axios.post(`/api/pph-21-kegiatan`, input, {
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
      `/api/pph-21-kegiatan?idl=${idl}&page=${page}&limit=${limit}&search=${
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
  kode_kegiatan_penghasilan_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.get(
      `/api/pph-21-kegiatan/${kode_kegiatan_penghasilan_orang_pribadi}`,
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
  input: TPPh21KegiatanFormSchema,
  kode_kegiatan_penghasilan_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.put(
      `/api/pph-21-kegiatan/${kode_kegiatan_penghasilan_orang_pribadi}`,
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
  kode_kegiatan_penghasilan_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.delete(
      `/api/pph-21-kegiatan/${kode_kegiatan_penghasilan_orang_pribadi}`,
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
