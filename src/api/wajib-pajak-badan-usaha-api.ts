import { TWajibPajakBadanUsahaFormSchema } from '@/types/wajib-pajak-badan-usaha-type';
import axios from 'axios';

export async function Create(
  input: TWajibPajakBadanUsahaFormSchema,
  token: string
) {
  try {
    const res = await axios.post(`/api/wajib-pajak-badan-usaha`, input, {
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
      `/api/wajib-pajak-badan-usaha?page=${page}&limit=${limit}&search=${
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

export async function Get(kode_wajib_pajak_badan_usaha: string, token: string) {
  try {
    const res = await axios.get(
      `/api/wajib-pajak-badan-usaha/${kode_wajib_pajak_badan_usaha}`,
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
  input: TWajibPajakBadanUsahaFormSchema,
  kode_wajib_pajak_badan_usaha: string,
  token: string
) {
  try {
    const res = await axios.put(
      `/api/wajib-pajak-badan-usaha/${kode_wajib_pajak_badan_usaha}`,
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
  kode_wajib_pajak_badan_usaha: string,
  token: string
) {
  try {
    const res = await axios.delete(
      `/api/wajib-pajak-badan-usaha/${kode_wajib_pajak_badan_usaha}`,
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
