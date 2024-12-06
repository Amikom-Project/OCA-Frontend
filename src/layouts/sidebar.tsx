import { Link } from 'react-router-dom';
import { navItems } from '@/constants/dashboard-nav-items';
import DashboardNav from '@/components/shared/dashboard-nav';

import Logo from '@/assets/logo.svg';

export default function Sidebar() {
  return (
    <aside className='hidden h-screen flex-col overflow-y-auto overflow-x-hidden border-r py-8 lg:flex px-5'>
      <Link to='/dashboard' className='flex items-center pl-3 mb-10'>
        <div className='relative w-20 mr-3'>
          <img src={Logo} alt='Logo One Collectiong Agent' />
        </div>
        <h1 className='text-sm font-bold uppercase italic'>
          One Collecting Agent
        </h1>
      </Link>

      <div className='mt-6 flex flex-1 flex-col justify-between'>
        <DashboardNav items={navItems} />
      </div>
    </aside>
  );
}
