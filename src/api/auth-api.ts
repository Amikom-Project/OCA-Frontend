import axios from 'axios';

import { TAuthFormSchema } from '@/types/auth-type';
import { TResponse } from '@/types/response-type';

export async function Login(input: TAuthFormSchema): Promise<TResponse> {
  try {
    const res = await axios.post('/api/login', {
      user_id: input.user_id,
      password: input.password,
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
