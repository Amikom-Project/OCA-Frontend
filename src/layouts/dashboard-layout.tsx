import { useState } from 'react';
import { Icons } from '@/components/ui/icons';
import Sidebar from '@/layouts/sidebar';
import Header from '@/layouts/header';
import MobileSidebar from '@/layouts/mobile-sidebar';
import Footer from '@/layouts/footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className='min-h-full'>
      <div className='fixed inset-y-0 z-30'>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar />
      </div>

      <div className='pl-80'>
        <div className='fixed top-0 right-0 left-80 z-20 bg-white'>
          <div className='flex h-20 shadow'>
            <button
              className='pl-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden bg-[#700070]'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Icons.menu className='h-6 w-6' aria-hidden='true' />
            </button>
            <Header />
          </div>
        </div>
        {/* Main content with padding for header */}
        <main className='min-h-screen pt-20 flex flex-col bg-slate-100'>
          <div className='flex-1 py-10'>{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
