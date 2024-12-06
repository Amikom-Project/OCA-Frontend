import { Link, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { useNavigateWithState } from '@/hooks/use-navigate-with-state';

import { ListPPh4Ayat2Entry } from '@/pages/dashboard/pph-4-ayat-2/queries';

import PPh4Ayat2Table from '@/pages/dashboard/pph-4-ayat-2/pph-4-ayat-2-table';
import PageHead from '@/components/shared/page-head.jsx';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function PPh4Ayat2EntryPage() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigateWithState = useNavigateWithState();

  const token = user?.access_token;
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;
  const search = searchParams.get('search') || '';

  const { data } = ListPPh4Ayat2Entry(idl, page, limit, token, search);

  const datas = data?.result;
  const totalDatas = data?.total_count;
  const pageCount = Math.ceil(totalDatas / limit);

  const handleUpdate = (kode_kegiatan_penghasilan_badan_usaha: string) => {
    navigateWithState(
      `/pph-4-ayat-2/data-pph-4-ayat-2/form-edit-pph-4-ayat-2`,
      {
        kode_kegiatan_penghasilan_badan_usaha:
          kode_kegiatan_penghasilan_badan_usaha,
      }
    );
  };

  return (
    <>
      <PageHead title='Data PPh 4 Ayat 2 Entry' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card className='border-none drop-shadow-sm'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <CardHeader className='space-y-4'>
              <CardTitle className='text-xl line-clamp-1'>
                Data PPh 4 Ayat 2 Entry
              </CardTitle>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data PPh 4 Ayat 2 Entry</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Link to='/dashboard'>
                <Button variant='default' size='sm'>
                  <Icons.left className='size-4 mr-2' />
                  Kembali
                </Button>
              </Link>
            </CardHeader>
          </div>
          <CardContent>
            {datas && (
              <PPh4Ayat2Table
                datas={datas}
                pageCount={pageCount}
                page={page}
                handleUpdate={handleUpdate}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
