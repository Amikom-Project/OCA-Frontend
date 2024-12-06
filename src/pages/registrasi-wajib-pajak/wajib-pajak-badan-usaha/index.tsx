import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { useDeleteData } from '@/hooks/use-delete-data';

import { Delete } from '@/api/wajib-pajak-badan-usaha-api';

import { ListWajibPajakBadanUsaha } from '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/queries';
import WajibPajakBadanUsahaTable from '@/pages/registrasi-wajib-pajak/wajib-pajak-badan-usaha/wajib-pajak-badan-usaha-table';

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

export default function WajibPajakBadanUsahaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.access_token;

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';

  const { data, refetch } = ListWajibPajakBadanUsaha(
    page,
    limit,
    token,
    search
  );

  const datas = data?.result;
  const totalDatas = data?.total_count;
  const pageCount = Math.ceil(totalDatas / limit);

  const handleUpdate = (kode_wajib_pajak_badan_usaha: string) => {
    navigate(
      `/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha/form-edit-wajib-pajak-badan-usaha`,
      {
        state: { kode_wajib_pajak_badan_usaha },
      }
    );
  };

  const { handleDelete } = useDeleteData(Delete, token, refetch);

  return (
    <>
      <PageHead title='Data Wajib Pajak Badan Usaha' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card className='border-none drop-shadow-sm'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <CardHeader className='space-y-4'>
              <CardTitle className='text-xl line-clamp-1'>
                Data Wajib Pajak Badan Usaha
              </CardTitle>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Registrasi Wajib Pajak</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      Data Wajib Pajak Badan Usaha
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Link to='/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha/form-tambah-wajib-pajak-badan-usaha'>
                <Button variant='brand' size='sm'>
                  <Icons.plus className='size-4 mr-2' />
                  Tambah Data
                </Button>
              </Link>
            </CardHeader>
          </div>
          <CardContent>
            {datas && (
              <WajibPajakBadanUsahaTable
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
