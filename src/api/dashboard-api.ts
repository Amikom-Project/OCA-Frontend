import axios from 'axios';

export async function Count(idl: string, token: string) {
  try {
    const res = await axios.get(`/api/dashboard?idl=${idl}`, {
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