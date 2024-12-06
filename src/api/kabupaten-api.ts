import axios from 'axios';

export async function List(token: string, nama_provinsi: string) {
  try {
    const res = await axios.get(
      `/api/kabupaten?nama_provinsi=${nama_provinsi}`,
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
