import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { useDeleteData } from '@/hooks/use-delete-data';

import { Delete } from '@/api/pph-21-penerima-api';

import { ListPPh21Penerima } from '@/pages/pph-21/pph-21-penerima/queries';
import PPh21PenerimaTable from '@/pages/pph-21/pph-21-penerima/pph-21-penerima-table';

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

export default function PPh21PenerimaPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const kode_kegiatan_penghasilan_orang_pribadi =
    searchParams.get('kode_kegiatan_penghasilan_orang_pribadi') ||
    location?.state?.kode_kegiatan_penghasilan_orang_pribadi;

  const token = user?.access_token;
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;
  const search = searchParams.get('search') || '';

  const { data, refetch } = ListPPh21Penerima(
    kode_kegiatan_penghasilan_orang_pribadi,
    idl,
    page,
    limit,
    token,
    search
  );

  const datas = data?.result;
  const totalDatas = data?.total_count;
  const pageCount = Math.ceil(totalDatas / limit);

  const { handleDelete } = useDeleteData(Delete, token, refetch);

  return (
    <>
      <PageHead title='Data PPh 21 Penerima' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card className='border-none drop-shadow-sm'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <CardHeader className='space-y-4'>
              <CardTitle className='text-xl line-clamp-1'>
                Data PPh 21 Penerima
              </CardTitle>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>PPh 21</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/pph-21/data-pph-21-kegiatan'>
                      Data PPh 21 Kegiatan
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data PPh 21 Penerima</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Link to='/pph-21/data-pph-21-kegiatan/data-pph-21-penerima/form-tambah-pph-21-penerima'>
                <Button variant='brand' size='sm'>
                  <Icons.plus className='size-4 mr-2' />
                  Tambah Data
                </Button>
              </Link>
            </CardHeader>
          </div>
          <CardContent>
            {datas && (
              <PPh21PenerimaTable
                datas={datas}
                pageCount={pageCount}
                page={page}
                // handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
