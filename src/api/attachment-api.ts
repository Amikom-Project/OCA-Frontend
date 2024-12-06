import axios from 'axios';

export async function Download(path: string, name: string, token: string) {
  try {
    const res = await axios.get(
      `/api/attachment/download?path=${path}&name=${name}`,
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
