import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

import { Get } from '@/api/wajib-pajak-badan-usaha-api';

import { TWajibPajakBadanUsahaModel } from '@/types/wajib-pajak-badan-usaha-type';

import FormEditWajibPajakBadanUsaha from '@/components/form/register-wajib-pajak/wajib-pajak-badan-usaha/form-edit-wajib-pajak-badan-usaha';

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

export default function FormEditWajibPajakBadanUsahaPage() {
  const location = useLocation();
  const { user } = useAuth();
  const token = user.access_token;

  const { kode_wajib_pajak_badan_usaha } = location?.state || {};

  const [data, setData] = useState<TWajibPajakBadanUsahaModel | null>(null);

  const fetch = useCallback(async () => {
    try {
      const result = await Get(kode_wajib_pajak_badan_usaha, token);
      setData(result?.result);
    } catch (error) {
      console.error('Failed to fetch Inventarisasi Pajak:', error);
    }
  }, [kode_wajib_pajak_badan_usaha, token]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <PageHead title='Form Edit Wajib Pajak Badan Usaha' />
      <div className='flex-1 space-y-4 px-4 md:px-8'>
        <Card>
          <CardHeader className='space-y-4'>
            <CardTitle>Form Edit Wajib Pajak Badan Usaha</CardTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Registrasi Wajib Pajak</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/registrasi-wajib-pajak/data-wajib-pajak-badan-usaha'>
                    Data Wajib Pajak Badan Usaha
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Form Edit Wajib Pajak Badan Usaha
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent>
            {data && <FormEditWajibPajakBadanUsaha initialData={data} />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
