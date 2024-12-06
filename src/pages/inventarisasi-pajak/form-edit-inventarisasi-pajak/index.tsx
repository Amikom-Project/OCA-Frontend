import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

import { TInventarisasiPajakModel } from '@/types/inventarisasi-pajak-type';

import { Get } from '@/api/inventarisasi-pajak-api';

import PageHead from '@/components/shared/page-head';
import FormEditInventarisasiPajak from '@/components/form/inventarisasi-pajak/form-edit-inventarisasi-pajak';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function FormEditInventarisasiPajakPage() {
  const location = useLocation();
  const { user } = useAuth();
  const token = user.access_token;

  const { kode_inventarisasi_pajak } = location?.state || {};

  const [data, setData] = useState<TInventarisasiPajakModel | null>(null);

  const fetch = useCallback(async () => {
    try {
      const result = await Get(kode_inventarisasi_pajak, token);
      setData(result?.result);
    } catch (error) {
      console.error('Failed to fetch Inventarisasi Pajak:', error);
    }
  }, [kode_inventarisasi_pajak, token]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <PageHead title='Form Edit Inventarisasi Pajak' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Edit Inventarisasi Pajak</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Inventarisasi Pajak</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/inventarisasi-pajak/data-inventarisasi-pajak'>
                    Data Inventarisasi Pajak
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Form Edit Inventarisasi Pajak</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            {data && <FormEditInventarisasiPajak initialData={data} />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
