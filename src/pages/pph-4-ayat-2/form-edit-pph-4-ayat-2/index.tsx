import PageHead from '@/components/shared/page-head';

import FormEditPPh4Ayat2 from '@/components/form/pph-4-ayat-2/form-edit-pph-4-ayat-2';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'react-router-dom';
import { TPPh4Ayat2Model } from '@/types/pph-4-ayat-2-type';
import { Get } from '@/api/pph-4-ayat-2-api';

export default function FormEditPPh4Ayat2Page() {
  const location = useLocation();
  const { user } = useAuth();
  const token = user.access_token;

  const { kode_kegiatan_penghasilan_badan_usaha } = location?.state || {};

  const [data, setData] = useState<TPPh4Ayat2Model | null>(null);

  const fetch = useCallback(async () => {
    try {
      const result = await Get(kode_kegiatan_penghasilan_badan_usaha, token);
      setData(result?.result);
    } catch (error) {
      console.error('Failed to fetch Inventarisasi Pajak:', error);
    }
  }, [kode_kegiatan_penghasilan_badan_usaha, token]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <PageHead title='Form Edit PPh 4 Ayat 2' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Edit PPh 4 Ayat 2</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>PPh 4 Ayat 2</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/pph-4-ayat-2/data-pph-4-ayat-2'>
                    Data PPh 4 Ayat 2
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Form Edit PPh 4 Ayat 2</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            {data && <FormEditPPh4Ayat2 initialData={data} />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
