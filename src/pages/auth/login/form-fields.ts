import { TAuthFormSchema } from '@/types/auth-type';

export const getFieldsMetaAuth: {
  [K in keyof TAuthFormSchema]: {
    id: K;
    label: string;
    subLabel?: string | null;
  };
} = {
  user_id: {
    id: 'user_id',
    label: 'NIP',
  },
  password: {
    id: 'password',
    label: 'Password',
  },
};
