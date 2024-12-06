import { z } from 'zod';

export const AuthValidation = z.object({
  user_id: z
    .string({ required_error: 'NIP tidak boleh kosong !' })
    .min(1, { message: 'NIP tidak boleh kosong !' })
    .length(9, { message: 'NIP harus 9 karakter !' })
    .trim(),
  password: z
    .string({
      required_error: 'Password tidak boleh kosong !',
    })
    .min(1, { message: 'Password tidak boleh kosong !' })
    .trim(),
});
