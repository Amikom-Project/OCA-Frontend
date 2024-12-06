import axios from 'axios';

import { TPPh4Ayat2FormSchema } from '@/types/pph-4-ayat-2-type';

export async function Create(input: TPPh4Ayat2FormSchema, token: string) {
  try {
    const res = await axios.post(`/api/pph-4-ayat-2`, input, {
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
      `/api/pph-4-ayat-2?idl=${idl}&page=${page}&limit=${limit}&search=${
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
      `/api/pph-4-ayat-2/entry?idl=${idl}&page=${page}&limit=${limit}&search=${
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
      `/api/pph-4-ayat-2/verifikasi?idl=${idl}&page=${page}&limit=${limit}&search=${
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
      `/api/pph-4-ayat-2/setor?idl=${idl}&page=${page}&limit=${limit}&search=${
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
  kode_kegiatan_penghasilan_badan_usaha: string,
  token: string
) {
  try {
    const res = await axios.get(
      `/api/pph-4-ayat-2/${kode_kegiatan_penghasilan_badan_usaha}`,
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
  input: TPPh4Ayat2FormSchema,
  kode_kegiatan_penghasilan_badan_usaha: string,
  token: string
) {
  try {
    const res = await axios.put(
      `/api/pph-4-ayat-2/${kode_kegiatan_penghasilan_badan_usaha}`,
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
  kode_kegiatan_penghasilan_badan_usaha: string,
  token: string
) {
  try {
    const res = await axios.delete(
      `/api/pph-4-ayat-2/${kode_kegiatan_penghasilan_badan_usaha}`,
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
