import { useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

import { GetPPh21Kegiatan } from '@/pages/pph-21/pph-21-kegiatan/queries';

import FormEditPPh21Kegiatan from '@/components/form/pph-21/pph-21-kegiatan/form-edit-pph-21-kegiatan';
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

export default function FormEditPPh21KegiatanPage() {
  const location = useLocation();
  const { user } = useAuth();

  const { kode_kegiatan_penghasilan_orang_pribadi } = location?.state || {};
  const token = user.access_token;

  const { data, refetch } = GetPPh21Kegiatan(
    kode_kegiatan_penghasilan_orang_pribadi,
    token
  );

  return (
    <>
      <PageHead title='Form Edit PPh 21 Kegiatan' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Edit PPh 21 Kegiatan</CardTitle>
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
                  <BreadcrumbPage>Form Edit PPh 21 Kegiatan</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            {data && (
              <FormEditPPh21Kegiatan
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
