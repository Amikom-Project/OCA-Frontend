import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import { TAuthFormSchema, TAuthModel } from '@/types/auth-type';
import { AuthValidation } from '@/validations/auth-schema-validation';
import { getFieldsMetaAuth } from '@/pages/auth/login/form-fields';

import { Login } from '@/api/auth-api';
import { useAuth } from '@/hooks/use-auth';

import Logo from '@/assets/logo.svg';

import PageHead from '@/components/shared/page-head.jsx';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const { login, pilihSatuanKerja, navigateAfterLogin } = useAuth();

  const form = useForm<TAuthFormSchema>({
    resolver: zodResolver(AuthValidation),
    defaultValues: {
      user_id: '',
      password: '',
    },
  });

  const onSubmit = async (data: TAuthFormSchema) => {
    try {
      const response = await Login(data);

      if (response.status.code === 200) {
        const token = response.result as {
          access_token: string;
          expires_in: number;
        };
        const user: TAuthModel = jwtDecode(token.access_token);

        if (user.idl.length > 1) {
          await pilihSatuanKerja({
            nip: user.nip,
            nama_pegawai: user.nama_pegawai,
            idl: user.idl,
            nama_satker: user.nama_satker,
            access_token: token.access_token,
          });

          navigate('/pilih-satuan-kerja');
        } else {
          await login({
            nip: user.nip,
            nama_pegawai: user.nama_pegawai,
            idl: user.idl,
            nama_satker: user.nama_satker,
            access_token: token.access_token,
          });

          navigateAfterLogin();
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage(error.response.data.result);
        }
      } else if (error instanceof Error) {
        console.log('error :', error.message);
      }
    }
  };

  return (
    <>
      <PageHead title='Login' />
      <div className='flex justify-center items-center min-h-screen bg-slate-100 px-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-4'>
            <img src={Logo} className='w-1/2 mx-auto' />
            <h1 className='text-base font-bold uppercase italic mx-auto'>
              One Collecting Agent
            </h1>
            <CardTitle className='text-xl text-center text-[#700070]'>
              Direktorat Perencanaan Dan Keuangan
            </CardTitle>
            <CardDescription className='text-center border-b pb-4'>
              Silahkan Login dengan NIP dan Password anda
            </CardDescription>
          </CardHeader>
          {errorMessage && (
            <div className='p-4'>
              <Alert variant='destructive'>
                <Icons.alert className='h-4 w-4' />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}
          <CardContent className='grid gap-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name={getFieldsMetaAuth.user_id.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getFieldsMetaAuth.user_id.label}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={9}
                          size={9}
                          placeholder='Masukan NIP Anda'
                          className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/\D/g, '');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={getFieldsMetaAuth.password.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{getFieldsMetaAuth.password.label}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          value={field.value}
                          placeholder='Masukan Password anda'
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant='brand' className='w-full' type='submit'>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
