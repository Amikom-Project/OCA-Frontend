import { useAuth } from '@/hooks/use-auth';

import Logo from '@/assets/logo.svg';

import PageHead from '@/components/shared/page-head.jsx';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';

export default function PilihSatuanKerjaPage() {
  const { user, login, navigateAfterLogin } = useAuth();

  const { nip, nama_pegawai, idl, nama_satker, access_token } = user;

  const handleSelectSatker = async (
    selectedIdl: string,
    selectedSatuanKerja: string
  ) => {
    const token = sessionStorage.getItem('access_token');

    if (!token) {
      console.error('Access token not found in session storage');
      return;
    }

    await login({
      nip: nip,
      nama_pegawai: user.nama_pegawai,
      idl: [selectedIdl],
      nama_satker: [selectedSatuanKerja],
      access_token: access_token,
    });

    navigateAfterLogin();
  };

  return (
    <>
      <PageHead title='Pilih Satuan Kerja' />
      <div className='flex justify-center items-center min-h-screen bg-slate-100 px-8'>
        <Card className='w-full max-w-xl'>
          <CardHeader className='space-y-4'>
            <img src={Logo} className='w-1/3 mx-auto' />
            <h1 className='text-base font-bold uppercase italic mx-auto'>
              One Collecting Agent
            </h1>
            <CardTitle className='text-xl text-center'>
              {nama_pegawai}
            </CardTitle>
            <CardDescription className='text-center border-b pb-4'>
              Pilih Satuan Kerja :
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center gap-4 w-full'>
            {Array.isArray(nama_satker) ? (
              nama_satker.map((satker: string, index: number) => (
                <Button
                  key={index}
                  variant='warning'
                  className='w-full max-w-sm'
                  onClick={() => handleSelectSatker(idl[index], satker)}
                >
                  <Icons.usercircle className='size-4 mr-2' />
                  {satker}
                </Button>
              ))
            ) : (
              <p>Data satuan kerja tidak tersedia</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
