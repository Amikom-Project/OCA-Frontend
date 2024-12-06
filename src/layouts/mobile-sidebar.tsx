import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import Logo from '@/assets/logo.svg';

import { navItems } from '@/constants/dashboard-nav-items';

import DashboardNav from '@/components/shared/dashboard-nav';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type TMobileSidebarProps = {
  className?: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
};
export default function MobileSidebar({
  setSidebarOpen,
  sidebarOpen,
}: TMobileSidebarProps) {
  return (
    <>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side='left' className=' px-0'>
          <SheetTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </SheetTitle>
          <SheetHeader>
            <SheetDescription />
          </SheetHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-4 px-3 py-2'>
              <Link to='/dashboard' className='flex items-center pl-3 mb-10'>
                <div className='relative w-20 mr-3'>
                  <img src={Logo} alt='Logo One Collectiong Agent' />
                </div>
                <h1 className='text-sm font-bold uppercase italic'>
                  One Collecting Agent
                </h1>
              </Link>

              <div className='space-y-1 px-2'>
                <DashboardNav items={navItems} setOpen={setSidebarOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
