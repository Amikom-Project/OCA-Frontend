import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { useDeleteData } from '@/hooks/use-delete-data';

import { Delete } from '@/api/inventarisasi-pajak-api';

import { ListInventarisasiPajak } from '@/pages/inventarisasi-pajak/queries';
import InventarisasiPajakTable from '@/pages/inventarisasi-pajak/inventarisasi-pajak-table';

import PageHead from '@/components/shared/page-head.jsx';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function InventarisasiPajakPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.access_token;

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;
  const search = searchParams.get('search') || '';

  const { data, refetch } = ListInventarisasiPajak(
    idl,
    page,
    limit,
    token,
    search
  );

  const datas = data?.result;
  const totalDatas = data?.total_count;
  const pageCount = Math.ceil(totalDatas / limit);

  const handleUpdate = (kode_inventarisasi_pajak: string) => {
    navigate(
      `/inventarisasi-pajak/data-inventarisasi-pajak/form-edit-inventarisasi-pajak`,
      {
        state: { kode_inventarisasi_pajak },
      }
    );
  };

  const { handleDelete } = useDeleteData(Delete, token, refetch);

  return (
    <>
      <PageHead title='Data Inventarisasi Pajak' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card className='border-none drop-shadow-sm'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <CardHeader className='space-y-4'>
              <CardTitle className='text-xl line-clamp-1'>
                Data Inventarisasi Pajak
              </CardTitle>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Inventarisasi Pajak</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Inventarisasi Pajak</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Link to='/inventarisasi-pajak/data-inventarisasi-pajak/form-tambah-inventarisasi-pajak'>
                <Button variant='brand' size='sm'>
                  <Icons.plus className='size-4 mr-2' />
                  Tambah Data
                </Button>
              </Link>
            </CardHeader>
          </div>
          <CardContent>
            {datas && (
              <InventarisasiPajakTable
                datas={datas}
                pageCount={pageCount}
                page={page}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
