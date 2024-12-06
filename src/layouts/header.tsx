import { useAuth } from '@/hooks/use-auth';

import UserNav from '@/components/shared/user-nav';

export default function Header() {
  const { user } = useAuth();

  const { nama_pegawai, nama_satker } = user;

  return (
    <div className='flex flex-1 items-center justify-end bg-[#700070] px-4'>
      <div className='ml-4 flex items-center md:ml-6'>
        <div className='flex flex-col space-y-1 mr-4'>
          <p className='text-sm font-medium leading-none text-white/90'>
            {nama_pegawai}
          </p>
          <p className='text-xs leading-none text-white/90'>{nama_satker}</p>
        </div>
        <UserNav />
      </div>
    </div>
  );
}
