import { useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

import { GetWajibPajakOrangPribadi } from '@/pages/registrasi-wajib-pajak/wajib-pajak-orang-pribadi/queries';

import FormEditWajibPajakOrangPribadi from '@/components/form/register-wajib-pajak/wajib-pajak-orang-pribadi/form-edit-wajib-pajak-orang-pribadi';
import PageHead from '@/components/shared/page-head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function FormEditWajibPajakOrangPribadiPage() {
  const location = useLocation();
  const { user } = useAuth();

  const { kode_wajib_pajak_orang_pribadi } = location?.state || {};
  const token = user.access_token;

  const { data, refetch } = GetWajibPajakOrangPribadi(
    kode_wajib_pajak_orang_pribadi,
    token
  );

  return (
    <>
      <PageHead title='Form Edit Wajib Pajak Orang Pribadi' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Edit Wajib Pajak Orang Pribadi</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Registrasi Wajib Pajak</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/registrasi-wajib-pajak/data-wajib-pajak-orang-pribadi'>
                    Data Wajib Pajak Orang Pribadi
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Form Edit Wajib Pajak Orang Pribadi
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            {data && (
              <FormEditWajibPajakOrangPribadi
                initialData={data}
                onEditSuccess={() => {
                  refetch();
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
