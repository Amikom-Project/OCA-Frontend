import axios from 'axios';

export async function List(
  idl: string,
  token: string,
  page: number,
  limit: number
) {
  try {
    const res = await axios.get(
      `/api/pengajuan-anggaran?idl=${idl}&page=${page}&limit=${limit}`,
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
