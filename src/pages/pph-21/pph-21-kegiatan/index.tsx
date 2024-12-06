import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { useNavigateWithState } from '@/hooks/use-navigate-with-state';
import { useDeleteData } from '@/hooks/use-delete-data';

import { Delete } from '@/api/pph-21-kegiatan-api';

import { ListPPh21Kegiatan } from '@/pages/pph-21/pph-21-kegiatan/queries';
import PPh21KegiatanTable from '@/pages/pph-21/pph-21-kegiatan/pph-21-kegiatan-table';

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

export default function PPh21PKegiatanPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigateWithState = useNavigateWithState();

  const token = user?.access_token;
  const idl = Array.isArray(user.idl) ? user.idl.join(', ') : user.idl;

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';
  const { data, refetch } = ListPPh21Kegiatan(idl, page, limit, token, search);
  const datas = data?.result;
  const totalDatas = data?.total_count;
  const pageCount = Math.ceil(totalDatas / limit);

  const handleMove = (kode_kegiatan_penghasilan_orang_pribadi: string) => {
    const queryParams = new URLSearchParams({
      kode_kegiatan_penghasilan_orang_pribadi:
        kode_kegiatan_penghasilan_orang_pribadi,
    }).toString();

    navigate(
      `/pph-21/data-pph-21-kegiatan/data-pph-21-penerima?${queryParams}`,
      {
        state: { kode_kegiatan_penghasilan_orang_pribadi },
      }
    );
  };

  const handleUpdate = (kode_kegiatan_penghasilan_orang_pribadi: string) => {
    navigateWithState(
      `/pph-21/data-pph-21-kegiatan/form-edit-pph-21-kegiatan`,
      {
        kode_kegiatan_penghasilan_orang_pribadi:
          kode_kegiatan_penghasilan_orang_pribadi,
      }
    );
  };

  const { handleDelete } = useDeleteData(Delete, token, refetch);

  return (
    <>
      <PageHead title='Data PPh 21 Kegiatan' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card className='border-none drop-shadow-sm'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <CardHeader className='space-y-4'>
              <CardTitle className='text-xl line-clamp-1'>
                Data PPh 21 Kegiatan
              </CardTitle>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>PPh 21</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data PPh 21 Kegiatan</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Link to='/pph-21/data-pph-21-kegiatan/form-tambah-pph-21-kegiatan'>
                <Button variant='brand' size='sm'>
                  <Icons.plus className='size-4 mr-2' />
                  Tambah Data
                </Button>
              </Link>
            </CardHeader>
          </div>
          <CardContent>
            {datas && (
              <PPh21KegiatanTable
                datas={datas}
                pageCount={pageCount}
                page={page}
                handleMove={handleMove}
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
