import axios from 'axios';

import { TPPh21PenerimaFormSchema } from '@/types/pph-21-penerima-type';

export async function Create(
  input: TPPh21PenerimaFormSchema,
  kode_kegiatan_penghasilan_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.post(
      `/api/pph-21-penerima/${kode_kegiatan_penghasilan_orang_pribadi}`,
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

export async function List(
  kode_kegiatan_penghasilan_orang_pribadi: string,
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) {
  try {
    const res = await axios.get(
      `/api/pph-21-penerima/${kode_kegiatan_penghasilan_orang_pribadi}?idl=${idl}&page=${page}&limit=${limit}&search=${
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

export async function ListEntry(
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) {
  try {
    const res = await axios.get(
      `/api/pph-21-penerima/entry?idl=${idl}&page=${page}&limit=${limit}&search=${
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

export async function ListVerifikasi(
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) {
  try {
    const res = await axios.get(
      `/api/pph-21-penerima/verifikasi?idl=${idl}&page=${page}&limit=${limit}&search=${
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

export async function ListSetor(
  idl: string,
  page: number,
  limit: number,
  token: string,
  search?: string
) {
  try {
    const res = await axios.get(
      `/api/pph-21-penerima/setor?idl=${idl}&page=${page}&limit=${limit}&search=${
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

export async function Delete(
  kode_item_kegiatan_orang_pribadi: string,
  token: string
) {
  try {
    const res = await axios.delete(
      `/api/pph-21-penerima/${kode_item_kegiatan_orang_pribadi}`,
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
