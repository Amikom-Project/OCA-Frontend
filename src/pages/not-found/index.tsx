import { useRouter } from '@/hooks/';

import PageHead from '@/components/shared/page-head.jsx';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <PageHead title='404 Halaman Tidak Ditemukan' />
      <div className='absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
        <span className='bg-[#700070] bg-clip-text text-[10rem] font-extrabold leading-none text-transparent'>
          404
        </span>
        <h2 className='font-heading my-2 text-2xl font-bold'>
          Halaman tidak ditemukan
        </h2>
        <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
        <div className='mt-8 flex justify-center gap-2'>
          <Button onClick={() => router.back()} variant='default' size='lg'>
            Kembali
          </Button>
        </div>
      </div>
    </>
  );
}
