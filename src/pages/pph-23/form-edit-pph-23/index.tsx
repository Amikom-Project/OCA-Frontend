import PageHead from '@/components/shared/page-head';

import FormEditPPh23 from '@/components/form/pph-23/form-edit-pph-23';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCallback, useEffect, useState } from 'react';
import { Get } from '@/api/pph-23-api';
import { TPPh23Model } from '@/types/pph-23-type';

export default function FormEditPPh23Page() {
  const location = useLocation();
  const { user } = useAuth();
  const token = user.access_token;

  const { kode_kegiatan_penghasilan_badan_usaha } = location?.state || {};

  const [data, setData] = useState<TPPh23Model | null>(null);

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
      <PageHead title='Form Edit PPh 23' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Edit PPh 23</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>PPh 23</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/pph-23/data-pph-23'>
                    Data PPh 23
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Form Edit PPh 23</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            {data && <FormEditPPh23 initialData={data} />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
